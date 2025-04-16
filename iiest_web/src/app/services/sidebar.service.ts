import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SidebarState {
  left: boolean;
  right: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebarState = new BehaviorSubject<SidebarState>({ left: false, right: false });
  sidebarState$ = this.sidebarState.asObservable();

  openSidebar(side: 'left' | 'right') {
    const currentState = { ...this.sidebarState.getValue(), [side]: true };

    // Auto close the other sidebar on mobile view
    if (window.innerWidth < 500) {
      if (side === 'left') {
        currentState.right = false;
      } else if (side === 'right') {
        currentState.left = false;
      }
    }

    this.sidebarState.next(currentState);
  }

  closeSidebar(side: 'left' | 'right') {
    const currentState = { ...this.sidebarState.getValue(), [side]: false };
    this.sidebarState.next(currentState);
  }

  isSidebarOpen(side: 'left' | 'right'): boolean {
    return this.sidebarState.getValue()[side];
  }

  getActiveSidebar(): ('left' | 'right' | null) {
    const state = this.sidebarState.getValue();
    if (state.left) return 'left';
    if (state.right) return 'right';
    return null;
  }
}
