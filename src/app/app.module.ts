import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ClanModule } from './clan/clan.module';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, SearchComponent],
  imports: [AppRoutingModule, SharedModule, ClanModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
