import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  
  @Output() onSidenavClose = new EventEmitter<void>();
  authSubscription: Subscription;
  isAuthenticated = false;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authSvc.authChange
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
      });
  }

  closeSidenav() {
    this.onSidenavClose.emit();
  }

  logout() {
    this.closeSidenav();
    this.authSvc.logout();    
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
