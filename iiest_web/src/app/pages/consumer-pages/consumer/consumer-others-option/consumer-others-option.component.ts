import { Component } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';
interface otherItems {
  id: number;
  title: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-consumer-others-option',
  templateUrl: './consumer-others-option.component.html',
  styleUrls: ['./consumer-others-option.component.scss']
})




export class ConsumerOthersOptionComponent {
  consumer = JSON.parse(localStorage.getItem('consumer') || '{}');
  VoluntaryItems:any[]
   constructor(private getDataService: GetdataService
    ) {  }

  otherItems: otherItems[] = [
    {
      id: 1,
      title: "HYGIENE RATING AUDIT",
      icon: "🛡️",
      color: "#d6d6d6"
    },
    {
      id: 2,
      title: "SCHEDULE IV HYGIENE FORMATS",
      icon: "📋",
      color: "#d6d6d6"
    },
    {
      id: 3,
      title: "FOOD PRODUCT TESTING",
      icon: "🍅",
      color: "#d6d6d6"
    },
    {
      id: 4,
      title: "MENU LABELLING",
      icon: "📑",
      color: "#d6d6d6"
    },
    {
      id: 5,
      title: "YOUR GOVT. OFFICER",
      icon: "👮",
      color: "#d6d6d6"
    },
    {
      id: 6,
      title: "FSSAI APPROVED VENDORS",
      icon: "✅",
      color: "#d6d6d6"
    },
    {
      id: 7,
      title: "UPDATED REGULATORY NOTIFICATIONS",
      icon: "📢",
      color: "#d6d6d6"
    },
    {
      id: 8,
      title: "EMERGENCY RESPONSE TECHNIQUES",
      icon: "⚠️",
      color: "#d6d6d6"
    }
  ];
  
  ngOnInit(): void {
    this.fetchShopLicenses(this.consumer.iiest_member_id,this.consumer.city_Id,this.consumer.business_category_ID);
  }

  fetchShopLicenses(boId: any, city_Id: any, business_category_ID: any): void {
    this.getDataService.getShopLicensesData(boId, city_Id, business_category_ID).subscribe(response => {
      if (response.success) {
        this.VoluntaryItems = response.licenses.Voluntary.map((license: any) => {
          return {
            id: license.id,
            name: license.name,
            color: license.status === 'Completed' ? '#15803D' : 
                   license.status === 'Pending' ? '#d6d6d6' : 
                   license.status === 'initiated' ? '#FFA500' : 'transparent',
            docObject: license.docObject,  
            object: license.object 
          };
        });
      }
    });
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
  
    return imageMap[itemName] || '../../../../../assets/images/licensesimg/IEC.png';
  }
}
