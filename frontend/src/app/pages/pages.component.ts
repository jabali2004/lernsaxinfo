import { isPlatformBrowser } from '@angular/common';
import { HostListener } from '@angular/core';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  NgcCookieConsentConfig,
  NgcCookieConsentModule,
  NgcCookieConsentService
} from 'ngx-cookieconsent';
import { timeoutWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AnalyticsService } from '../services/analytics.service';
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
    private ccService: NgcCookieConsentService,
    private analyticsService: AnalyticsService,
    @Inject(PLATFORM_ID) public platformId: string
  ) {
    this.translate
      .get([
        'cookie.header',
        'cookie.message',
        'cookie.dismiss',
        'cookie.allow',
        'cookie.deny',
        'cookie.link',
        'cookie.policy'
      ])
      .subscribe((data) => {
        const content = this.ccService.getConfig().content || {};

        // Override default messages with the translated ones
        content.header = data['cookie.header'];
        content.message = data['cookie.message'];
        content.dismiss = data['cookie.dismiss'];
        content.allow = data['cookie.allow'];
        content.deny = data['cookie.deny'];
        content.link = data['cookie.link'];
        content.policy = data['cookie.policy'];

        this.ccService.destroy(); // remove previous cookie bar (with default messages)

        const config = this.ccService.getConfig();
        config.content = content;

        this.ccService.init(config); // update config with translated messages
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
      this.ccService.initialize$.subscribe((event) => {
        switch (event.status) {
          case 'allow':
            this.analyticsService.enable();
            this.applicationInsightsService.start();
            break;

          case 'deny':
            this.analyticsService.disable();
            break;

          default:
            this.analyticsService.disable();
            break;
        }
      });

      this.ccService.statusChange$.subscribe((event) => {
        switch (event.status) {
          case 'allow':
            this.analyticsService.enable();
            this.applicationInsightsService.start();
            break;

          case 'deny':
            this.analyticsService.disable();
            break;

          default:
            this.analyticsService.disable();
            break;
        }
      });
    }
  }
}
