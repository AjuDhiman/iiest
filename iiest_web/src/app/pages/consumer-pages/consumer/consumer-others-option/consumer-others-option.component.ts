import { Component } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';
import { RegisterService } from 'src/app/services/register.service';
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
   constructor(private getDataService: GetdataService,private registerService: RegisterService
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
    const shopId = this.registerService.getShopId();

    this.fetchShopLicenses(this.consumer.iiest_member_id,shopId,this.consumer.city_Id,this.consumer.business_category_ID);
  }

  fetchShopLicenses(boId: any,shopId:any, city_Id: any, business_category_ID: any): void {
    this.getDataService.getShopLicensesData(boId,shopId, city_Id, business_category_ID).subscribe(response => {
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
  
}
