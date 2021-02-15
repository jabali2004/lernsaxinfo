import { isPlatformBrowser } from '@angular/common';
import { HostListener } from '@angular/core';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationInsightsService } from '../services/application-insights.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  public isShow = false;
  private topPosToStartShowing = 100;

  constructor(
    private acceptCookies: MatSnackBar,
    private translate: TranslateService,
    private applicationInsightsService: ApplicationInsightsService,
    @Inject(PLATFORM_ID) public platformId: string
  ) {}

  public openSnackBar(): void {
    this.translate.get('cookies.message').subscribe(() => {
      const message = this.translate.instant('cookies.message');
      const accept = this.translate.instant('cookies.accept');
      this.acceptCookies
        .open(message, accept, {})
        .onAction()
        .subscribe(() => {
          if (isPlatformBrowser(this.platformId)) {
            this.applicationInsightsService.start();
            localStorage.setItem('cookies_accept', 'accepted');
          }
        });
    });
  }

  @HostListener('window:scroll')
  checkScroll(): void {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  public gotoTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem('cookies_accept')) {
        this.openSnackBar();
      } else {
        this.applicationInsightsService.start();
      }
    }
  }
}
