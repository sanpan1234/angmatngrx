import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';
//if you subscribe, remember to unsubscribe to avoid memory leaks

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  isAuthenticated = false;
  @Output() onSidenavToggle = new EventEmitter<void>();

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authSvc.authChange
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
      });
  }

  toggleSidenav() {
    this.onSidenavToggle.emit();
  }

  logout() {
    this.authSvc.logout();    
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
