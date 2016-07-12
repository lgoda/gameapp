import { provideRouter, RouterConfig } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import { PlayComponent } from './play.component';

const routes: RouterConfig = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
      path: 'play',
      component: PlayComponent
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
