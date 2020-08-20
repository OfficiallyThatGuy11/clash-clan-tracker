import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayerOverviewComponent } from './player/components/player-overview/player-overview.component';
import { ClanOverviewComponent } from './clan/components/clan-overview/clan-overview.component';

const defaultPath = '/home';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'clan/:tag',
    component: ClanOverviewComponent
  },
  {
    path: 'player/:tag',
    component: PlayerOverviewComponent
  },
  {
    path: '',
    redirectTo: defaultPath,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: defaultPath,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
