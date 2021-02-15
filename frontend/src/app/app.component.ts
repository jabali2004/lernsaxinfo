import { Component } from '@angular/core';
import { ApplicationInsightsService } from './services/application-insights.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}
}
