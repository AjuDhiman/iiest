import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consumer-sidebar',
 templateUrl: './consumer-sidebar.component.html',
  styleUrls: ['./consumer-sidebar.component.scss']
})
export class ConsumerSidebarComponent {
  isCollapsed = true;
  constructor(private router: Router) { }
 toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
 consumerLogout() {
  localStorage.removeItem('selectedShopId');
    localStorage.removeItem("consumerAuthToken");
    localStorage.removeItem("consumer");
    this.router.navigate(['']); 
  }

  navigateToConnectWithUs() {
    this.router.navigate(['/consumer-chat']);
    this.isCollapsed=true;
  }
  
}
