import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { SidebarService } from 'src/app/services/sidebar.service';


@Component({
  selector: 'app-consumer-sidebar',
 templateUrl: './consumer-sidebar.component.html',
  styleUrls: ['./consumer-sidebar.component.scss']
})
export class ConsumerSidebarComponent {
  
  shopId: string | null = null;
  isCollapsed = true;
  private sub: Subscription;

  constructor(private router: Router,private registerService: RegisterService,
    private sidebarService: SidebarService
  ) { 

  }
  // ngOnInit(): void {
  //   this.shopId = this.registerService.getShopId();
  //   if (window.innerWidth >= 992) { 
  //     this.isCollapsed = false;
  //   }else{
  //     this.isCollapsed = true;
  
  //   }
  // }

  ngOnInit(): void {
    this.shopId = this.registerService.getShopId();
    this.sub = this.sidebarService.activeSidebar$.subscribe(active => {
      this.isCollapsed = active !== 'left';
    });

    if (window.innerWidth >= 992) {
      this.sidebarService.openSidebar('left'); // optionally open on large screens
    }
  }

//  toggleSidebar() {
//     this.isCollapsed = !this.isCollapsed;
//   }
toggleSidebar() {
  if (this.sidebarService.getActiveSidebar() === 'left') {
    this.sidebarService.closeSidebar();
  } else {
    this.sidebarService.openSidebar('left');
  }
}

 consumerLogout() {
  localStorage.removeItem('selectedShopId');
    localStorage.removeItem("consumerAuthToken");
    localStorage.removeItem("consumer");
    this.router.navigate(['']); 
    this.sidebarService.closeSidebar();
  }


  navigateTo(url: string) {
    this.router.navigate([url]);
    // this.isCollapsed = true;
    this.sidebarService.closeSidebar();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
