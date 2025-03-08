import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsumerDashboardComponent } from './consumer-dashboard/consumer-dashboard.component';
import { ConsumerMainPageComponent } from './consumer-main-page/consumer-main-page.component';

@NgModule({
  declarations: [
    ConsumerDashboardComponent,
    ConsumerMainPageComponent, 
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
