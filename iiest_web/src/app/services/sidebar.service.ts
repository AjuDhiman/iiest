import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private activeSidebar = new BehaviorSubject<'left' | 'right' | null>(null);
  activeSidebar$ = this.activeSidebar.asObservable();

  openSidebar(side: 'left' | 'right') {
    this.activeSidebar.next(side);
  }

  closeSidebar() {
    this.activeSidebar.next(null);
  }

  getActiveSidebar() {
    return this.activeSidebar.getValue();
  }
}
