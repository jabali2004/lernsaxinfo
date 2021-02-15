import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'upcoming-features',
        loadChildren: () =>
          import('./upcoming-features/upcoming-features.module').then(
            (m) => m.UpcomingFeaturesModule
          )
      },
      {
        path: 'imprint',
        loadChildren: () =>
          import('./imprint/imprint.module').then((m) => m.ImprintModule)
      },
      {
        path: 'privacy',
        loadChildren: () =>
          import('./privacy/privacy.module').then((m) => m.PrivacyModule)
      },
      {
        path: '**',
        redirectTo: 'home'
        // component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
