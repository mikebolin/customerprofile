import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AppComponent } from './app.component';
import { CustomerDetailsComponent } from './pages/CustomerProfile/customer-details.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { CustomerProfileComponent } from './pages/CustomerProfile/customer-profile.component';
import { AlertMessageComponent } from './shared/alert-message/alert-message.component';
import { TooltipModule } from '@progress/kendo-angular-tooltip';

import { AppRoutingModule } from './app-routing.module';
//import { CustomerService } from './services/customer.service';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
    bootstrap:    [AppComponent],
    declarations: [AppComponent, CustomerProfileComponent,CustomerDetailsComponent, AlertMessageComponent],
    imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, InputsModule, AppRoutingModule,HttpClientModule,TooltipModule,
    DateInputsModule,GridModule,DropDownsModule,DialogModule, WindowModule, ReactiveFormsModule    ],
    providers: []
})
export class AppModule { }

