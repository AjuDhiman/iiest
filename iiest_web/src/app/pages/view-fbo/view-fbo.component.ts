import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faIndianRupeeSign, faFile, faDownload } from '@fortawesome/free-solid-svg-icons';
import { fboRecipient, fboShop } from 'src/app/utils/registerinterface';
import { GetdataService } from 'src/app/services/getdata.service';
import { RegisterService } from 'src/app/services/register.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-fbo',
  templateUrl: './view-fbo.component.html',
  styleUrls: ['./view-fbo.component.scss']
})
export class ViewFboComponent implements OnInit {
  @Input() public fboData: any;
  fulladdress: string;
  recipientData: fboRecipient;
  shopDetails: fboShop;
  isfostac:boolean= false;
  faIndianRupeeSign = faIndianRupeeSign;
  faFile=faFile;
  faDownload=faDownload;
  showInvoice:boolean=false;
  invoice:string='';
  constructor(public activeModal: NgbActiveModal,
    private getDataServices: GetdataService,
    private registerServices: RegisterService,
    private toasterService: ToastrService
    ) { 
  }

  ngOnInit(): void {
    this.isfostac = true?this.fboData.product_name.includes('Fostac Training') : this.isfostac = false;
   //this.fulladdress =  "Village: "+ this.fboData.village+", Post-Office: "+ this.fboData.address+", Tehsil: "+ this.fboData.tehsil+", District: "+ this.fboData.district+", State: "+ this.fboData.state+", Pincode: "+ this.fboData.pincode+", "+ "India";
   this.fulladdress =  this.fboData.fboInfo.village+", "+ this.fboData.fboInfo.address+", "+ this.fboData.fboInfo.tehsil+", "+ this.fboData.fboInfo.district+", "+ this.fboData.fboInfo.state+", Pincode: "+ this.fboData.fboInfo.pincode+", "+ "India";
   console.log(this.fboData);
  }
  closeModal() {
    this.activeModal.close();
  }

  openInvoiceWindow(){
    this.showInvoice=true;
    this.getInvoice();
  }

  getInvoice() {
    this.getDataServices.getInvoice(this.fboData.invoiceId).subscribe({
      next: (res) => {
        console.log(res)
        this.invoice = res.invoiceConverted;
      },
      error(err) {
        let errorObj = err.error;
        if(errorObj.userError){
          
        }else if(errorObj.randomErr){

        }else if(errorObj.oldInvoiceErr){
          
        }
      },
    })
  }

  closeInvoiceWindow(){
    this.showInvoice=false;
  }

}