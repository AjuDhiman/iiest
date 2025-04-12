
import { Component, OnInit } from '@angular/core';
import { faChevronRight, IconDefinition ,faFile} from '@fortawesome/free-solid-svg-icons';
import { ViewDocumentComponent } from 'src/app/pages/modals/view-document/view-document.component';
import { GetdataService } from 'src/app/services/getdata.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from 'src/app/services/register.service';


interface ComplianceItem {
  id: number;
  title: string;
  icon: string;
  color: string;
}
@Component({
  selector: 'app-consumer-dashboard',
  templateUrl: './consumer-dashboard.component.html',
  styleUrls: ['./consumer-dashboard.component.scss']
})


export class ConsumerDashboardComponent { 
    faFile: IconDefinition = faFile;
    remainingTime: string = '';

    consumer = JSON.parse(localStorage.getItem('consumer') || '{}');


  faChevronRight = faChevronRight;
  complianceItems:any[];
  constructor(private getDataService: GetdataService,private ngbModal: NgbModal,private registerService: RegisterService
  ) {  }

  ngOnInit(): void {
    const shopId = this.registerService.getShopId();

    this.fetchShopLicenses(this.consumer.iiest_member_id,shopId,this.consumer.city_Id,this.consumer.business_category_ID);
  }
  fetchShopLicenses(boId: any,shopId:any, city_Id: any, business_category_ID: any): void {
    this.getDataService.getShopLicensesData(boId, shopId,city_Id, business_category_ID).subscribe(response => {
      if (response.success) {
        // Access only the mandatory licenses
        this.complianceItems = response.licenses.mandatory.map((license: any) => {
          return {
            id: license.id,
            name: license.name,
            icon: this.getIcon(license.name),
            color: license.status === 'Completed' ? '#15803D' : 
                   license.status === 'Pending' ? '#E63946' : 
                   license.status === 'Initiated' ? '#FFA500' : 'transparent',
            docObject: license.docObject,  
            object: license.object 
          };
        });
      }
    });
  }
  


  getIcon(title: string): string {
    const icons: { [key: string]: string } = {
      'Health Trade License': '🛡️',
      'FSSAI License': '🍽️',
      'Shop Estd. Registration': '🏪',
      'Food Training': '👨‍🍳',
      'Medical Certificate': '🩺',
      'Water Testing Report': '📋',
      'Fire NOC': '🧯',
      'DPCC License': '🌎',
      'Liquor License': '🥃'
    };
    return icons[title] || '❓';
  }

   getImageForItem(itemName: string): string {
    const imageMap: { [key: string]: string } = {
      'Health and Trade': '../../../../../assets/images/logo/health and trade lisc.png',
      'FSSAI': '../../../../../assets/images/logo/Fssai License.png',
      'Shop Estd. Registration': '../../../../../assets/images/licensesimg/shopRegistration.jpg',
      'Food Training': '../../../../../assets/images/logo/food safety awarness training.png',
      'Medical Certificate': '../../../../../assets/images/logo/medicial test.png',
      'Water Testing Report': '../../../../../assets/images/logo/water testing.png',
      'Fire NOC': '../../../../../assets/images/logo/fire-noc.png',
      'DPCC License': '../../../../../assets/images/licensesimg/dpcc.jpg',
      'Liquor License': '../../../../../assets/images/logo/liquor lisc.png',
      'Eatinghouse': '../../../../../assets/images/logo/pollution noc.png',
      'Pollution': '../../../../../../assets/images/licensesimg/pollution.jpg',
      'Shop establishment':'../../../../../../assets/images/logo/shop establish lisc.png',
      'Water':'../../../../../../assets/images/licensesimg/water.jpg',
      'FOSTAC':'../../../../../../assets/images/logo/Fostac certificate.png',
      'Food Sample':'../../../../../../assets/images/logo/food safety awarness training.png',
      'Hygiene':'../../../../../../assets/images/logo/hygiene rating audit.png',
      'Food Sample*':'../../../../../../assets/images/logo/food safety awarness training.png',
      'Pest Control':'../../../../../../assets/images/logo/pest-control.png',
      'Medical':'../../../../../../assets/images/licensesimg/Medical.jpg',
      'RUCO*':'../../../../../../assets/images/logo/Ruco.png',
      'ISO':'../../../../../../assets/images/logo/Iso Audit.png',
      'Menu Labeling':'../../../../../../assets/images/logo/menu labelling.png',
      '3rd Party':'../../../../../../assets/images/logo/Thrid party audit.png',
      'Liquor*':'../../../../../../assets/images/logo/liquor lisc.png',
      'Trade': '../../../../../assets/images/logo/Trade lisc.png',



    };
   return imageMap[itemName] || '../../../../../assets/images/logo/Import-Export Certiifcate.png'
  }
  
  
  getDocs(oid:any): void {
    this.getDataService.getDocs(oid).subscribe(response => {
      if (response.success) {
      console.log("response===========>",response)
      }
    });
    
  }

  onItemClick(item: any): void {    
    if (item.object && item.object.handlerId) {
      this.getDocs(item.object.handlerId);
    } else {
      console.warn('No handlerId found for this item');
    }
  }
  findFoscosLicense(documents: any[]) {
    return documents?.find(doc => doc.name === "Foscos License");
  }
  
 viewDocument(name: string, res: any, format: string, isMultiDoc: boolean, issuedDate: string, licenseDuration: number): void { 
  let obj = {
    name: name,
    src: isMultiDoc ? res : [res.toString()], 
    format: format,
    multipleDoc: isMultiDoc,
    issuedDate: issuedDate, 
    licenseDuration: licenseDuration 
  };
  
  const modalRef = this.ngbModal.open(ViewDocumentComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.doc = obj;
    }

   // calculateRemaningDays(createdAt: string, license_duration: string): string {
    //   if (!createdAt || !license_duration) return "Invalid Data";
    
    //   let today = new Date().getTime();
    //   let startDate = new Date(createdAt);
    //   let lastDate = new Date(startDate.getFullYear() + Number(license_duration), startDate.getMonth(), startDate.getDate()).getTime();
    //   let remainingDays: number = Math.floor((lastDate - today) / (1000 * 60 * 60 * 24));
    
    //   let remainingYear: number = Math.floor(remainingDays / 365);
    //   remainingDays = remainingDays % 365;
    
    //   for (let year: number = 0; year < remainingYear; year++) {
    //     if (new Date(remainingYear + year, 1, 29).getDate() === 29) {
    //       remainingDays--;
    //     }
    //   }
    
    //   let remainingMonths: number = Math.floor(remainingDays / 30.5);
    //   remainingDays = Math.floor(remainingDays % 30.5); // Fix modulo value to 30.5
    //    return `${remainingYear} Years ${remainingMonths} Months ${remainingDays} Days`;
    // }
    
  
}




