import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { CurrencyPipe } from '@angular/common';
import { NgxCurrencyModule } from "ngx-currency";
import { AmortizacionComponent } from './amortizacion/amortizacion.component';

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
    NgxCurrencyModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
