import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { PeriodoAmortizacion } from './model/periodo-amortizacion'

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  private periodosSource = new Subject<PeriodoAmortizacion[]>();
  periodo$ = this.periodosSource.asObservable();

  private calculaPeriodo( periodoAnterior: PeriodoAmortizacion, tasaInteres: number, pagoMensual: number, abonoCapital: number): PeriodoAmortizacion {
    const saldoAnterior = periodoAnterior.saldoRestante;
    const intPeriodo = saldoAnterior * tasaInteres / 12;
    let capPeriodo = pagoMensual - intPeriodo;
    if(capPeriodo > saldoAnterior){
      capPeriodo = saldoAnterior;
    }
    
    const resultado: PeriodoAmortizacion = {
      numPeriodo: periodoAnterior.numPeriodo + 1,
      capitalPeriodo: capPeriodo,
      interesPeriodo: intPeriodo,
      seguros: periodoAnterior.seguros,
      pagoTotal: capPeriodo + intPeriodo + periodoAnterior.seguros,
      abonoCapital: abonoCapital,
      saldoRestante: saldoAnterior - capPeriodo - abonoCapital,
      capitalAcumulado: periodoAnterior.capitalAcumulado + capPeriodo + abonoCapital,
      interesAcumulado: periodoAnterior.interesAcumulado + intPeriodo
    };
    return resultado;
  }

  private pagoMensual(prestamo: number, tasaInteres: number, mesesPlazo: number): number{
    const intRate = tasaInteres / 12;
    const proporcion = Math.pow(1 + intRate, mesesPlazo);
    return prestamo * intRate * proporcion / (proporcion - 1) ;
  }

  calcularHipoteca(hipoteca: any) {
    const tasaInteres = hipoteca['interesAnual']/100;
    const valorCasa = hipoteca['valorCasa'];
    const plazo = hipoteca['plazo'] * 12;
    const dineroDisponible = hipoteca['ingresosMensuales'] - hipoteca['gastosMensuales']
    
    var prestamo = valorCasa - hipoteca['enganche'];
    var pagoMensual = this.pagoMensual(prestamo, tasaInteres, plazo);
    var abonoCapital = Math.max(dineroDisponible - pagoMensual, 0);
    console.log("Pago mensual:", pagoMensual)

    var periodoAnterior = new PeriodoAmortizacion();
    periodoAnterior.abonoCapital = abonoCapital;
    periodoAnterior.saldoRestante = valorCasa - hipoteca['enganche'];
    periodoAnterior.seguros = 0.0008 * periodoAnterior.saldoRestante;

    var periodos = [];
    for(let numPeriodo=0; numPeriodo<plazo && periodoAnterior.saldoRestante>0; numPeriodo++){
      periodoAnterior = this.calculaPeriodo(periodoAnterior, tasaInteres, pagoMensual, abonoCapital);
      periodos.push(periodoAnterior);
      if(hipoteca['ingresosMensuales']){
        prestamo -= abonoCapital;
        pagoMensual = this.pagoMensual(prestamo, tasaInteres, plazo);
        abonoCapital = Math.max(dineroDisponible - pagoMensual, 0);
      }
    }
    console.log(periodos);
    this.periodosSource.next(periodos);
  }

  constructor() { }
}
