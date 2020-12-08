import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {

  public formatoCurr = { prefix: '$', thousands:',', decimal:'.'}
  public formatoPorc = { prefix: '%', thousands:',', decimal:'.'}
  constructor(public fb: FormBuilder) { }

  public hipoteca = this.fb.group({
    valorCasa: [1000000, Validators.required],
    interesAnual: [10.0, Validators.required],
    enganche: [20000, Validators.required],
    plazo: [15, Validators.required],
    gastosMensuales: [0, Validators.required],
    ingresosMensuales: [0, Validators.required],
  });
  

  onSubmit(){
    alert(JSON.stringify(this.hipoteca.value))
  }
}
