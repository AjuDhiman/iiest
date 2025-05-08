import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewDocumentComponent } from 'src/app/pages/modals/view-document/view-document.component';
import { GetdataService } from 'src/app/services/getdata.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-consumer-invoice',
  templateUrl: './consumer-invoice.component.html',
  styleUrls: ['./consumer-invoice.component.scss']
})
export class ConsumerInvoiceComponent implements OnInit {
  consumer = JSON.parse(localStorage.getItem('consumer') || '{}');
  employeeSales: any[] = [];
  invoice: string = '';

  invoiceArr: any = [];
  constructor(private getDataService: GetdataService, private ngbModal: NgbModal,  private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    const shopId = this.registerService.getShopId();
    console.log("shopId==>",shopId)
    this.fetchShopLicenses(this.consumer.iiest_member_id);

  }

  fetchShopLicenses(boId: any): void {
    this.getDataService.getAllSalesData(boId).subscribe(response => {
      if (response.success && response.salesInfo) {
        this.employeeSales = response.salesInfo; // ✅ Corrected key
        console.log("employeeSales==>",this.employeeSales)

      }
    });
  }
  
  getInvoice(invoiceId:any) {
      this.invoiceArr = [];
      invoiceId.forEach((invoice: { src: string, id: string }) => {
        this.getDataService.getConsumerInvoice(invoice.src).subscribe({
          next: (res) => {
            this.invoice = res.invoiceConverted;
            this.invoiceArr.push(this.invoice);
          },
          error(err) {
            let errorObj = err.error;
            if (errorObj.userError) {

            } else if (errorObj.randomErr) {

            } else if (errorObj.oldInvoiceErr) {

            }
          },
        })
      });
    
  }

  viewInvoice(sale: any): void {
    console.log("Fetching invoice for sale:", sale);

  
    if (!sale.invoiceId.length) {
      alert("No Invoice Available");
      return;
    }
   this.getInvoice(sale.invoiceId);
   const modalRef = this.ngbModal.open(ViewDocumentComponent, { size: 'xl', backdrop: 'static' });
   modalRef.componentInstance.doc = {
     name: `Invoice of ${sale.fboInfo?.fbo_name}`,
     format: 'pdf',
     src: this.invoiceArr,
     multipleDoc: true
   }

    // let invoiceArr: string[] = [];
  
    // // Fetch invoices using invoice IDs
    // sale.invoiceId.forEach((invoiceId: string) => {
    //   this.getDataService.getConsumerInvoice(invoiceId).subscribe({
    //     next: (res) => {
    //       invoiceArr.push(res.invoiceConverted);
  
    //       // Open modal after all invoices are fetched
    //       if (invoiceArr.length === sale.invoiceId.length) {
    //         const modalRef = this.ngbModal.open(ViewDocumentComponent, { size: 'xl', backdrop: 'static' });
    //         modalRef.componentInstance.doc = {
    //           name: `Invoice of ${sale.fboInfo?.fbo_name || 'Unknown'}`,
    //           format: 'pdf',
    //           src: invoiceArr, 
    //           multipleDoc: true

    //         };
  
    //         console.log("Selected Sales Data:", sale);
    //       }
    //     },
    //     error: (err) => {
    //       console.error("Error fetching invoice:", err);
    //     }
    //   });
    // });
  }
  
}

