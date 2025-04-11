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
      'Health and Trade': '../../../../../assets/images/licensesimg/muncipleCorporate.jpg',
      'FSSAI': '../../../../../assets/images/licensesimg/fssai.webp',
      'Shop Estd. Registration': '../../../../../assets/images/licensesimg/shopRegistration.jpg',
      'Food Training': '../../../../../assets/images/licensesimg/fostao.jpg',
      'Medical Certificate': '../../../../../assets/images/licensesimg/medicalCertificate.jpg',
      'Water Testing Report': '../../../../../assets/images/licensesimg/nabl.jpg',
      'Fire NOC': '../../../../../assets/images/licensesimg/FireNoc.jpg',
      'DPCC License': '../../../../../assets/images/licensesimg/dpcc.jpg',
      'Liquor License': '../../../../../assets/images/licensesimg/liquorLicense.jpg',
      'Eatinghouse': '../../../../../assets/images/licensesimg/EatingHouse.png',
      'Pollution': '../../../../../../assets/images/licensesimg/pollution.jpg',
      'Shop establishment':'../../../../../../assets/images/licensesimg/shopestablishment.jpg',
      'Water':'../../../../../../assets/images/licensesimg/water.jpg',
      'FOSTAC':'../../../../../../assets/images/licensesimg/fostac.jpg',
      'Food Sample':'../../../../../../assets/images/licensesimg/FoodSaftyAwarness.jpg',
      'Hygiene':'../../../../../../assets/images/licensesimg/Hygiene.jpg',
      'Food Sample*':'../../../../../../assets/images/licensesimg/foodSample.jpg',
      'Pest Control':'../../../../../../assets/images/licensesimg/pest control.jpg',
      'Medical':'../../../../../../assets/images/licensesimg/Medical.jpg',
      'RUCO*':'../../../../../../assets/images/licensesimg/ruconew.jpg',
      'ISO':'../../../../../../assets/images/licensesimg/isonew.jpg',
      'Menu Labeling':'../../../../../../assets/images/licensesimg/menuLabelling.jpg',
      '3rd Party':'../../../../../../assets/images/licensesimg/thirdparty.jpg',
      'Liquor*':'../../../../../../assets/images/licensesimg/liquor.jpg',
















    };
  
    return imageMap[itemName] || '../../../../../assets/images/licensesimg/optionalImage.png'
  }
  
}
