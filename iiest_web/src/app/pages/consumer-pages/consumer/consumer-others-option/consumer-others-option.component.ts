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

    this.fetchShopLicenses();
  }

  fetchShopLicenses(): void {
    this.getDataService.getVoluntaoryLicensesData().subscribe(response => {
      if (response.success) {
        this.VoluntaryItems = response.data.map((license: any) => {
          return {
            id: license.id,
            name: license.name,
            color: license.status === 'Completed' ? '#15803D' : 
                   license.status === 'Pending' ? '#d6d6d6' : 
                   license.status === 'initiated' ? '#FFA500' : 'rgb(214, 214, 214)',
          };
        });
      }
    });
  }
  
  getImageForItem(itemName: string): string {
    const imageMap: { [key: string]: string } = {
      'ISO Consultation':'../../../../../../assets/images/logo/iso consultation.png',
      'ISO Audit':'../../../../../../assets/images/logo/Iso Audit.png',
      'Hygiene Rating Audit':'../../../../../../assets/images/logo/hygiene rating audit.png',
      'Food Safety Awareness Training':'../../../../../../assets/images/logo/food safety awarness training.png',
      'Pest Control':'../../../../../../assets/images/logo/pest-control.png',
     'ISO Internal Auditor Training':'../../../../../../assets/images/logo/Iso internal audit training.png',
      'GAP Assessment':'../../../../../../assets/images/logo/gap assessment.png',
      'Lead Auditor Training': '../../../../../assets/images/logo/lead auditor training.png',
      'NON NABL Water Test Report': '../../../../../assets/images/logo/water testing.png',

    };
   return imageMap[itemName] || '../../../../../assets/images/logo/Import-Export Certiifcate.png'
  }
  
}
