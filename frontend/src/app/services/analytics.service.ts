import { Injectable } from '@angular/core';

import Analytics, { AnalyticsInstance } from 'analytics';
// @ts-ignore
import googleAnalytics from '@analytics/google-analytics';
import { environment } from 'src/environments/environment';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private enabled: boolean | undefined;
  private analytics: AnalyticsInstance | undefined;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.enabled && this.analytics) {
          this.analytics.page();
        }
      }
    });
  }

  /**
   * Set analytics config
   */
  private setConfig(): void {
    this.analytics = Analytics({
      app: 'pflegeampel',
      version: '0.0.1',
      plugins: [
        googleAnalytics({
          trackingId: environment.trackingId
        })
      ]
    });
  }

  /**
   * Enable analytics
   */
  public enable(): void {
    if (!this.analytics) {
      this.setConfig();
    }

    this.enabled = true;

    if (this.analytics) {
      this.analytics.page();
    }
  }

  /**
   * Disable analytics
   */
  public disable(): void {
    this.enabled = false;
  }

  /**
   * Return analytics object
   */
  public get Analytics(): AnalyticsInstance | void {
    if (this.analytics) {
      return;
    }
    return this.analytics;
  }
}
