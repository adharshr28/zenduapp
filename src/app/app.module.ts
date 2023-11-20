import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module'; 
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { HeaderModule } from './components/header/header.module';
import { HeaderComponent } from './components/header/header.component';
import { SubmissionsPageModule } from './components/submissions-page/submissions-page.module';
import { SubmissionsPageComponent } from './components/submissions-page/submissions-page.component';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    SidebarModule,
    RouterOutlet,
    HeaderModule,
    RouterModule, 
    SubmissionsPageModule, 
    SubmissionsPageComponent
  ],
  providers: [],
  bootstrap: []

})
export class AppModule { }