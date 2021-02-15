import { Injectable, OnInit } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationInsightsService {
  private routerSubscription: Subscription = new Subscription();

  private appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: environment.instrumentationKey
    }
  });

  constructor(private router: Router) {}

  public start(): void {
    this.appInsights.loadAppInsights();
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof ResolveEnd))
      .subscribe((event: any) => {
        const activatedComponent = this.getActivatedComponent(event.state.root);
        if (activatedComponent) {
          this.logPageView(
            `${activatedComponent.name} ${this.getRouteTemplate(
              event.state.root
            )}`,
            event.urlAfterRedirects
          );
        }
      });
  }

  logPageView(name?: string, uri?: string): void {
    this.appInsights.trackPageView({ name, uri });
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }

  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = '';
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }

    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }

    return path;
  }
}
