import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from './app-routing';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ContactlistComponent } from './components/contactlist/contactlist.component';
import { ContactManagementComponent } from './components/contact-management/contact-management.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ContactlistComponent,
    ContactManagementComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    NgPipesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
