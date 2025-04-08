import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExportAsModule } from 'ngx-export-as';
import { MultiSelectComponent } from 'src/app/shared/multi-select/multi-select.component';
import { ViewDocumentComponent } from 'src/app/pages/modals/view-document/view-document.component';
import { InrAmountPipe } from 'src/app/pipes/inr-amount.pipe';
import { ConsumerSidebarComponent } from './consumer-sidebar/consumer-sidebar.component';
import { ConsumerFooterComponent } from './consumer-footer/consumer-footer.component';
import { ConsumerRightSidebarComponent } from './consumer-right-sidebar/consumer-right-sidebar.component';



@NgModule({
  declarations: [
    MultiSelectComponent,
    ViewDocumentComponent,
    InrAmountPipe,
    ConsumerSidebarComponent,
    ConsumerFooterComponent,
    ConsumerRightSidebarComponent
  ],
  imports: [
    CommonModule,
    //Ngx Modules
    NgxLoadingModule.forRoot({
      primaryColour:'#15a362',
      secondaryColour:'#15a362',
      tertiaryColour:'#15a362'
    }),
    NgxPaginationModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000, // 5 seconds
      progressBar: false,
    }),
    PdfViewerModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ExportAsModule,
    
  ],
  exports: [
    NgxLoadingModule,
    NgxPaginationModule,
    ToastrModule,
    PdfViewerModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ExportAsModule,
    ViewDocumentComponent,
    MultiSelectComponent,
    InrAmountPipe,
    ConsumerSidebarComponent,
    ConsumerFooterComponent,
    ConsumerRightSidebarComponent

  ],
  providers: [
    InrAmountPipe
  ]
})
export class SharedModule { }
