import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faBell, faPhone, faChalkboardTeacher, faBars ,faBookOpen ,faPhoneVolume
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consumer-footer',
  templateUrl: './consumer-footer.component.html',
  styleUrls: ['./consumer-footer.component.scss']
})
export class ConsumerFooterComponent {
  
  phoneNumber: string = '9289310979'; 

  constructor(library: FaIconLibrary,private router: Router) {
    library.addIcons(faShoppingCart, faBell, faPhone, faChalkboardTeacher, faBars,faBookOpen,faPhoneVolume);
  }

  navigateToOtherOptions() {
    this.router.navigate(['/consumer-other-option']);
  }
  navigateToNotification() {
    this.router.navigate(['/consumer-notification']);
  }
  
  navigateToInVoice() {
    this.router.navigate(['/consumer-invoice']);
  }

  makeCall() {
    window.location.href = 'tel:' + this.phoneNumber;
  }
}
