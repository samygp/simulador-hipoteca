import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CalculadoraService } from '../calculadora.service';
import { PeriodoAmortizacion } from '../model/periodo-amortizacion';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrls: ['./amortizacion.component.scss']
})
export class AmortizacionComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private calculadora: CalculadoraService) {
    this.dsPeriodos = new MatTableDataSource<PeriodoAmortizacion>([]);
    this.dsPeriodos.paginator = this.paginator;
   }

  columnas: string[] = [
    'numPeriodo', 'capitalPeriodo', 'interesPeriodo', 
    'seguros', 'pagoTotal', 'abonoCapital', 'saldoRestante',
    'capitalAcumulado', 'interesAcumulado'
  ];

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.calculadora.periodo$.subscribe( periodos => {
      const ultimoPeriodo = periodos[periodos.length - 1];
      this.summary = [
        {label: "Capital total:", value: ultimoPeriodo.capitalAcumulado},
        {label: "Interes total:", value: ultimoPeriodo.interesAcumulado + ultimoPeriodo.seguros * periodos.length},
        {label: "Ingresos mínimos:", value: 1 * periodos[0].pagoTotal / .4}
      ];
      this.dsPeriodos = new MatTableDataSource<PeriodoAmortizacion>(periodos);
      this.dsPeriodos.paginator = this.paginator;
    });
  }

  dsPeriodos: MatTableDataSource<PeriodoAmortizacion>;
  summary: any[]=[];

}
