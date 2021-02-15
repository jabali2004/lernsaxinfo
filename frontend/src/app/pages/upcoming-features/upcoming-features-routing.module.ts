import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpcomingFeaturesComponent } from './upcoming-features.component';

const routes: Routes = [
  {
    path: '',
    component: UpcomingFeaturesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpcomingFeaturesRoutingModule {}
