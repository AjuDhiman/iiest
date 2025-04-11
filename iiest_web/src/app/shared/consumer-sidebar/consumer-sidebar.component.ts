import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-consumer-sidebar',
 templateUrl: './consumer-sidebar.component.html',
  styleUrls: ['./consumer-sidebar.component.scss']
})
export class ConsumerSidebarComponent {
  
  shopId: string | null = null;

  isCollapsed = true;
  constructor(private router: Router,private registerService: RegisterService) { 

  }
  ngOnInit(): void {
    this.shopId = this.registerService.getShopId();
    if (window.innerWidth >= 992) { 
      this.isCollapsed = false;
    }else{
      this.isCollapsed = true;
  
    }
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


  navigateTo(url: string) {
    this.router.navigate([url]);
    this.isCollapsed = true;
  }
}
