import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faBell, faBookOpen, faChalkboardTeacher, faPhone, faPhoneVolume, faShoppingCart, faStore } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { GetdataService } from 'src/app/services/getdata.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-consumer-main-page',
  templateUrl: './consumer-main-page.component.html',
  styleUrls: ['./consumer-main-page.component.scss']
})
export class ConsumerMainPageComponent {
  shops: any[] = [];
  faStore = faStore;
  showDropdown = false;
 driveVideoUrl: string = 'https://drive.google.com/file/d/1isI_YuozFcDhLjV4IVgfmVCFVnrILZFx/view?usp=drive_link';
  trustedVideoUrl: SafeResourceUrl | null = null;
  
  shopId: string = '';
  consumer = JSON.parse(localStorage.getItem('consumer') || '{}');

  constructor(library: FaIconLibrary,private router: Router,private route: ActivatedRoute ,private getDataService: GetdataService,  private registerService: RegisterService, private sanitizer: DomSanitizer) {
    this.trustedVideoUrl = this.getEmbedUrl(this.driveVideoUrl);
    library.addIcons(faShoppingCart, faBell, faPhone, faChalkboardTeacher, faBars,faBookOpen,faPhoneVolume);

  }

  statistics: any ;

  ngOnInit(): void {
    this.registerService.setShopId("");

    console.log("consumer==>",this.consumer)
    this.shopId = this.route.snapshot.paramMap.get('shopId') || '';
    console.log('Shop ID:', this.shopId);

    this.fetchStatistics(this.consumer.iiest_member_id);

    this.getDataService.getShopsByBoId(this.consumer.iiest_member_id).subscribe({
      next: (res: any) => {
        this.shops = res.shops || [];
      },
      error: (err) => {
        console.error('Failed to load shops:', err);
      }
    });
  }
   

  getEmbedUrl(url: string): SafeResourceUrl | null {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const fileId = match[1];
      const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl);
    }
    return null;
  }

  

  navigateToDashboard(shop: any) {
    this.registerService.setShopId(shop.shopId);
    this.router.navigate(['/consumer-dashboard']);
  }
  

  fetchStatistics(boId:any): void {
    this.getDataService.getConsumerStatisticsData(boId).subscribe(
      (response) => {
        if (response.success) {
          this.statistics = response.statistics;
        }
      },
      (error) => {
        console.error('Error fetching statistics:', error);
      }
    );
  }


  openNotificationModal() {
  
      const modalElement = document.getElementById('notificationModal');
      if (modalElement) {
        const modal = new Modal(modalElement, { backdrop: false });
        modal.show();
    
        // Handle animation on close
        modalElement.addEventListener('hide.bs.modal', (event) => {
          const dialog = modalElement.querySelector('.modal-dialog');
          if (dialog) {
            // Add slide-out class
            dialog.classList.add('slide-out-right');
    
            // Delay actual hide
            event.preventDefault(); // prevent instant hide
    
            setTimeout(() => {
              modal.hide(); // force hide after animation
              dialog.classList.remove('slide-out-right');
            }, 400); // match CSS animation duration
          }
        }, { once: true }); // only once per modal open
      }
    }
}
