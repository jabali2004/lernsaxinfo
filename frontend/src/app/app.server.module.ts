import { LOCALE_ID, NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { readFileSync } from 'fs';
import { Observable, Observer } from 'rxjs';

import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEn, 'en');
registerLocaleData(localeDe, 'de');

export function universalLoader(): TranslateLoader {
  return {
    getTranslation: (lang: string) => {
      return Observable.create((observer: Observer<any>) => {
        observer.next(
          JSON.parse(
            readFileSync(
              `./dist/LernSaxInfo/browser/assets/i18n/${lang}.json`,
              'utf8'
            )
          )
        );
        observer.complete();
      });
    }
  } as TranslateLoader;
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: universalLoader },
      defaultLanguage: 'de'
    })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
