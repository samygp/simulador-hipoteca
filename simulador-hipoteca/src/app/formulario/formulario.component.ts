import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { CalculadoraService } from '../calculadora.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})

export class FormularioComponent {

  public formatoCurr = { prefix: '$', thousands:',', decimal:'.'}
  public formatoPorc = { prefix: '%', thousands:',', decimal:'.'}

  constructor(public fb: FormBuilder, private calculadora: CalculadoraService) { }

  public hipoteca = this.fb.group({
    valorCasa: [1000000, Validators.required],
    interesAnual: [10.0, Validators.required],
    enganche: [0, Validators.required],
    plazo: [15, Validators.required],
    gastosMensuales: [0],
    ingresosMensuales: [0],
  });

  valorCasa(){
    return this.hipoteca.value['valorCasa'] || 0;
  }
  
  formatLabel(value: number) {
    if(value < 1000000){
      return `$${(value/1000).toFixed(1)}k`;
    }
    return `$${(value/1000000).toFixed(1)}M`
  }  
  onSubmit(){
    const valores = this.hipoteca.value;
    this.calculadora.calcularHipoteca(valores);
  }
}
