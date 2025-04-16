import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-consumer-sidebar',
  templateUrl: './consumer-sidebar.component.html',
  styleUrls: ['./consumer-sidebar.component.scss']
})
export class ConsumerSidebarComponent implements OnInit, OnDestroy {

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
      this.isCollapsed = !state.left;
    });

    if (window.innerWidth >= 500) {
      this.sidebarService.openSidebar('left');
      this.sidebarService.openSidebar('right'); // both open on large screens
    }
  }

  toggleSidebar() {
    if (this.sidebarService.isSidebarOpen('left')) {
      this.sidebarService.closeSidebar('left');
    } else {
      this.sidebarService.openSidebar('left');
    }
  }

  consumerLogout() {
    localStorage.removeItem('selectedShopId');
    localStorage.removeItem("consumerAuthToken");
    localStorage.removeItem("consumer");
    this.router.navigate(['']);
    this.sidebarService.closeSidebar('left');
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
    this.sidebarService.closeSidebar('left');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
