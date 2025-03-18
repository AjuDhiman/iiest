import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsumerDashboardComponent } from './consumer-dashboard/consumer-dashboard.component';
import { ConsumerMainPageComponent } from './consumer-main-page/consumer-main-page.component';
import { ConsumerOthersOptionComponent } from './consumer-others-option/consumer-others-option.component';
import { ConsumerInvoiceComponent } from './consumer-invoice/consumer-invoice.component';

@NgModule({
  declarations: [
    ConsumerDashboardComponent,
    ConsumerMainPageComponent,
    ConsumerOthersOptionComponent,
    ConsumerInvoiceComponent, 
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ConsumerDashboardComponent
  ]
})
export class ConsumerModule { }
