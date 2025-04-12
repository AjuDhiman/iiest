import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsumerDashboardComponent } from './consumer-dashboard/consumer-dashboard.component';
import { ConsumerMainPageComponent } from './consumer-main-page/consumer-main-page.component';
import { ConsumerOthersOptionComponent } from './consumer-others-option/consumer-others-option.component';
import { ConsumerInvoiceComponent } from './consumer-invoice/consumer-invoice.component';
import { ConsumerNotificationsComponent } from './consumer-notifications/consumer-notifications.component';
import { ConnectWithUsComponent } from './connect-with-us/connect-with-us.component';
import { ConsumerShopDetailsComponent } from './consumer-shop-details/consumer-shop-details.component';
import { OperationformModule } from '../../operation/modules/operationform.module';
import { ConsumerSettingsComponent } from './consumer-settings/consumer-settings.component';
import { ConsumerFoodDocComponent } from './consumer-food-doc/consumer-food-doc.component';
import { ExpertResourcesComponent } from './expert-resources/expert-resources.component';
import { ExpertConsulationComponent } from './expert-consulation/expert-consulation.component';
import { ConsumerFaqComponent } from './consumer-faq/consumer-faq.component';
import { LocalOfficerComponent } from './local-officer/local-officer.component';

@NgModule({
  declarations: [
    ConsumerDashboardComponent,
    ConsumerMainPageComponent,
    ConsumerOthersOptionComponent,
    ConsumerInvoiceComponent,
    ConsumerNotificationsComponent,
    ConnectWithUsComponent,
    ConsumerShopDetailsComponent,
    ConsumerSettingsComponent,
    ConsumerFoodDocComponent, 
    ExpertResourcesComponent,
    ExpertConsulationComponent,
    ConsumerFaqComponent,
    LocalOfficerComponent, 
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    
    ConsumerDashboardComponent,
    ConnectWithUsComponent
  ]
})
export class ConsumerModule { }
