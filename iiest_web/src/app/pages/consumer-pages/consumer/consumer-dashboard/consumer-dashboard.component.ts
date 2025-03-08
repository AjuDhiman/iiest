
import { Component, OnInit } from '@angular/core';
import { faChevronRight, IconDefinition ,faFile} from '@fortawesome/free-solid-svg-icons';
import { ViewDocumentComponent } from 'src/app/pages/modals/view-document/view-document.component';
import { GetdataService } from 'src/app/services/getdata.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  // complianceItems: ComplianceItem[] = [
  //   {
  //     id: 1,
  //     title: "HEALTH/TRADE LICENSE",
  //     icon: "🛡️",
  //     color: "#15803D"
  //   },
  //   {
  //     id: 2,
  //     title: "FSSAI LICENSE",
  //     icon: "🍽️",
  //     color: "#15803D"
  //   },
  //   {
  //     id: 3,
  //     title: "SHOP &STD. REGISTRATION",
  //     icon: "🏪",
  //     color: "#15803D"
  //   },
  //   {
  //     id: 4,
  //     title: "FOOD TRAINING",
  //     icon: "👨‍🍳",
  //     color: "#15803D"
  //   },
  //   {
  //     id: 5,
  //     title: "MEDICAL CERTIFICATE",
  //     icon: "🩺",
  //     color: "#15803D"
  //   },
  //   {
  //     id: 6,
  //     title: "WATER TESTING REPORT",
  //     icon: "📋",
  //     color: "#15803D"
  //   },
  //   {
  //     id: 7,
  //     title: "FIRE NOC",
  //     icon: "🧯",
  //     color: "#15803D"
  //   },
  //   {
  //     id: 8,
  //     title: "DPCC LICENSE",
  //     icon: "🌎",
  //     color: "#15803D"
  //   },
  //   {
  //     id: 9,
  //     title: "LIQUOR LICENSE",
  //     icon: "🥃",
  //     color: "#15803D"
  //   }
  // ];
  
  constructor(private getDataService: GetdataService,    private ngbModal: NgbModal
  ) {  }
  ngOnInit(): void {
    console.log("consumer---<",this.consumer.iiest_member_id)
    this.fetchShopLicenses(this.consumer.iiest_member_id);
  }
  
  fetchShopLicenses(boId:any): void {
    this.getDataService.getShopLicensesData(boId).subscribe(response => {
      if (response.success) {
        this.complianceItems = response.licenses.map((license: any) => {
          return {
            id: license.id,
            name: license.name,
            icon: this.getIcon(license.name),
            color: license.status === 'Completed' ? '#15803D' : 
            license.status === 'Pending' ? '#E63946' : 
            license.status === 'initiated' ? '#FFA500' : 'transparent'  ,
            docObject:license.docObject,
            object:license.object
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
      'Health Trade License': '../../../../../assets/images/licensesimg/muncipleCorporate.jpg',
      'FSSAI License': '../../../../../assets/images/licensesimg/fssai.jpg',
      'Shop Estd. Registration': '../../../../../assets/images/licensesimg/shopRegistration.jpg',
      'Food Training': '../../../../../assets/images/licensesimg/fostao.jpg',
      'Medical Certificate': '../../../../../assets/images/licensesimg/medicalCertificate.jpg',
      'Water Testing Report': '../../../../../assets/images/licensesimg/nabl.jpg',
      'Fire NOC': '../../../../../assets/images/licensesimg/dfs.jpg',
      'DPCC License': '../../../../../assets/images/licensesimg/dpcc.jpg',
      'Liquor License': '../../../../../assets/images/licensesimg/liquorLicense.jpg'
    };
  
    return imageMap[itemName] || '../../../../../assets/images/licensesimg/default.jpg';
  }
  

  getDocs(oid:any): void {
    this.getDataService.getDocs(oid).subscribe(response => {
      if (response.success) {
      console.log("response===========>",response)
      }
    });
    
  }

  onItemClick(item: any): void {
    console.log("item=============>",item)
    if (item.object && item.object.handlerId) {
      this.getDocs(item.object.handlerId);
    } else {
      console.warn('No handlerId found for this item');
    }
  }

    viewDocument(name: string, res: any, format: string, isMultiDoc: boolean): void { 
      console.log("name===============>",name)
      let obj = {
        name: name,
        src: isMultiDoc ? res : [res.toString()], // we will put single src in array because our component needs array of src for showing docs
        format: format,
        multipleDoc: isMultiDoc
      }
      const modalRef = this.ngbModal.open(ViewDocumentComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.doc = obj;
    }



    calculateRemaningDays(createdAt: string, license_duration: string): string {
      if (!createdAt || !license_duration) return "Invalid Data";
    
      let today = new Date().getTime();
      let startDate = new Date(createdAt);
      let lastDate = new Date(startDate.getFullYear() + Number(license_duration), startDate.getMonth(), startDate.getDate()).getTime();
      let remainingDays: number = Math.floor((lastDate - today) / (1000 * 60 * 60 * 24));
    
      let remainingYear: number = Math.floor(remainingDays / 365);
      remainingDays = remainingDays % 365;
    
      for (let year: number = 0; year < remainingYear; year++) {
        if (new Date(remainingYear + year, 1, 29).getDate() === 29) {
          remainingDays--;
        }
      }
    
      let remainingMonths: number = Math.floor(remainingDays / 30.5);
      remainingDays = Math.floor(remainingDays % 30.5); // Fix modulo value to 30.5
    
      return `${remainingYear} Years ${remainingMonths} Months ${remainingDays} Days`;
    }
    
  
}




