import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector:'app-dashboard',
  templateUrl:'./main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  userName = "";
  time = new Date();
  timer;
  timezone: any = "";
  bidderId: "";
  isExpanded = true;
  isShowing = true;
  user:any  = "";
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  ngOnInit() {
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.user = JSON.parse(sessionStorage.getItem('user'));
    
  }
  constructor(_changeDetectorRef: ChangeDetectorRef, _media: MediaMatcher, public router: Router) {
  }
  signOut() {
    window.sessionStorage.clear();
    this.router.navigate(['']);
  }
}

