import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApplicationInsightsService } from './services/application-insights.service';
import { environment } from 'src/environments/environment';
import { AnalyticsService } from './services/analytics.service';

import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import {
  NgcCookieConsentConfig,
  NgcCookieConsentModule
} from 'ngx-cookieconsent';

registerLocaleData(localeEn, 'en');
registerLocaleData(localeDe, 'de');

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.basePath
  },
  palette: {
    popup: {
      background: '#39424C'
    },
    button: {
      background: '#F4EEED'
    }
  },
  theme: 'block',
  type: 'info',
  revokable: false,
  layout: 'my-custom-layout',
  layouts: {
    'my-custom-layout': '{{messagelink}}{{buttons}}'
  },
  elements: {
    buttons: `
     <a aria-label="deny cookie" tabindex="0" class="cc-btn cc-deny mt-1 p-1">{{deny}}</a>
     <a aria-label="allow cookie" tabindex="1" class="cc-btn cc-allow mt-1 p-1 ml-0 ml-md-2">{{allow}}</a>
    `
  },
  content: {
    href: 'https://www.lernsaxinfo.com/pages/privacy'
  }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'de'
    }),
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    ApplicationInsightsService,
    AnalyticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
