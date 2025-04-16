import { Component, OnDestroy, OnInit, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-consumer-right-sidebar',
  templateUrl: './consumer-right-sidebar.component.html',
  styleUrls: ['./consumer-right-sidebar.component.scss']
})
export class ConsumerRightSidebarComponent implements OnInit, OnDestroy {

  shopId: string | null = null;
  isCollapsed = true;
  private sub: Subscription;

  constructor(private router: Router,private registerService: RegisterService,
    private sidebarService: SidebarService
    
  ) { 

  }
  ngOnInit(): void {
    this.shopId = this.registerService.getShopId();
    this.sub = this.sidebarService.activeSidebar$.subscribe(active => {
      this.isCollapsed = active !== 'right';
    });

    if (window.innerWidth >= 992) {
      this.sidebarService.openSidebar('right'); // optionally open on large screens
    }
  }
  toggleSidebar() {
    if (this.sidebarService.getActiveSidebar() === 'right') {
      this.sidebarService.closeSidebar();
    } else {
      this.sidebarService.openSidebar('right');
    }
  }
 consumerLogout() {
  localStorage.removeItem('selectedShopId');
    localStorage.removeItem("consumerAuthToken");
    localStorage.removeItem("consumer");
    this.router.navigate(['']); 
    this.sidebarService.closeSidebar();

  }

  navigateToConnectWithUs() {
    this.router.navigate(['/consumer-chat']);
    // this.isCollapsed=true;
    this.sidebarService.closeSidebar();

  }
  
  navigateToOtherOptions() {
    // this.isCollapsed = true;

    this.router.navigate(['/consumer-other-option']);
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
