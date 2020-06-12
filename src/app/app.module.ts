import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ClanModule } from './clan/clan.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material';

@NgModule({
	declarations: [ AppComponent, HomeComponent, HeaderComponent ],
	imports: [ BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, MatTableModule, ClanModule ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
