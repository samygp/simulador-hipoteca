import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { CurrencyPipe } from '@angular/common';
import { NgxCurrencyModule } from "ngx-currency";
import { AmortizacionComponent } from './amortizacion/amortizacion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CalculadoraService } from './calculadora.service';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    AmortizacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatPaginatorModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [CurrencyPipe, CalculadoraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
