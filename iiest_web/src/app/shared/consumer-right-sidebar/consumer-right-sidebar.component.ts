import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-consumer-right-sidebar',
  templateUrl: './consumer-right-sidebar.component.html',
  styleUrls: ['./consumer-right-sidebar.component.scss']
})
export class ConsumerRightSidebarComponent {

  shopId: string | null = null;

  isCollapsed = true;
  constructor(private router: Router,private registerService: RegisterService) { 

  }
  ngOnInit(): void {
    this.shopId = this.registerService.getShopId();
  }
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
  
  navigateToOtherOptions() {
    this.isCollapsed = true;

    this.router.navigate(['/consumer-other-option']);
  }

}
