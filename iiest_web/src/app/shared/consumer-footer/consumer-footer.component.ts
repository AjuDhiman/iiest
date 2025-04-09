import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faBell, faPhone, faChalkboardTeacher, faBars ,faBookOpen ,faPhoneVolume
} from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-consumer-footer',
  templateUrl: './consumer-footer.component.html',
  styleUrls: ['./consumer-footer.component.scss']
})
export class ConsumerFooterComponent {
  selectedMenu: string = 'home';
  phoneNumber: string = '9289310979'; 
  driveVideoUrl: string = 'https://drive.google.com/file/d/1isI_YuozFcDhLjV4IVgfmVCFVnrILZFx/view?usp=drive_link';
  trustedVideoUrl: SafeResourceUrl | null = null;
  constructor(library: FaIconLibrary,private router: Router,private sanitizer: DomSanitizer) {
    this.trustedVideoUrl = this.getEmbedUrl(this.driveVideoUrl);

    library.addIcons(faShoppingCart, faBell, faPhone, faChalkboardTeacher, faBars,faBookOpen,faPhoneVolume);
  }

  navigateToOtherOptions() {
    this.selectedMenu = 'other-options';

    this.router.navigate(['/consumer-other-option']);
  }
  navigateToCutomerSetting() {

    this.router.navigate(['/consumer-settings']);
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
  navigateToNotification() {
    this.router.navigate(['/consumer-notification']);
  }
  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }
  navigateToHome() {
    this.selectedMenu = 'home';

    this.router.navigate(['/consumer-main-page']);
  }
  navigateToInVoice() {
    this.selectedMenu = 'invoice';

    this.router.navigate(['/consumer-invoice']);
  }

  makeCall() {
    window.location.href = 'tel:' + this.phoneNumber;
  }
  openNotificationModal() {
    this.selectedMenu = 'notification';

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
