import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.shopId = this.registerService.getShopId();
    this.sub = this.sidebarService.sidebarState$.subscribe(state => {
      this.isCollapsed = !state.right;
    });

    if (window.innerWidth >= 500) {
      this.sidebarService.openSidebar('right');
      this.sidebarService.openSidebar('left'); // both open on large screens
    }
  }

  toggleSidebar() {
    if (this.sidebarService.isSidebarOpen('right')) {
      this.sidebarService.closeSidebar('right');
    } else {
      this.sidebarService.openSidebar('right');
    }
  }

  consumerLogout() {
    localStorage.removeItem('selectedShopId');
    localStorage.removeItem("consumerAuthToken");
    localStorage.removeItem("consumer");
    this.router.navigate(['']);
    this.sidebarService.closeSidebar('right');
  }

  navigateToConnectWithUs() {
    this.router.navigate(['/consumer-chat']);
    this.sidebarService.closeSidebar('right');
  }

  navigateToOtherOptions() {
    this.router.navigate(['/consumer-other-option']);
    this.sidebarService.closeSidebar('right');
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
    this.sidebarService.closeSidebar('right');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
