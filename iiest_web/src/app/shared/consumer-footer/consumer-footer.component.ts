import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faBell, faPhone, faChalkboardTeacher, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consumer-footer',
  templateUrl: './consumer-footer.component.html',
  styleUrls: ['./consumer-footer.component.scss']
})
export class ConsumerFooterComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faShoppingCart, faBell, faPhone, faChalkboardTeacher, faBars);
  }
}
