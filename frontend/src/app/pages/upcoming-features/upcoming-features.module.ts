import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingFeaturesRoutingModule } from './upcoming-features-routing.module';
import { UpcomingFeaturesComponent } from './upcoming-features.component';
import { TranslateModule } from '@ngx-translate/core';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [UpcomingFeaturesComponent],
  imports: [
    CommonModule,
    UpcomingFeaturesRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatChipsModule,
    TranslateModule
  ]
})
export class UpcomingFeaturesModule {}
