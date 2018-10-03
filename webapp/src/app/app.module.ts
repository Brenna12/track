import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatRadioModule,
  MatGridListModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { SlickModule } from 'ngx-slick';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { AuthenticationService } from "./authentication.service";
import { LogoutComponent } from './logout/logout.component';

import { AccountComponent } from './account/account.component';
import { FooterComponent } from './footer/footer.component';
import { AuthInterceptor } from "./auth/interceptor.service";
import { ProjectsModule } from "./projects/projects.module";
import { ProjectsService } from "./projects/projects.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BoardComponent } from './home/board/board.component';
import { EnvironmentService } from './environment.service';

const appInitializerFn = (appConfig: EnvironmentService, ) => {
  return () => {
    console.log(window.location.host)
    return appConfig.loadAppConfig(window.location.host);
  }
};



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    AuthComponent,
    LogoutComponent,
    AccountComponent,
    FooterComponent,
    BoardComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SlickModule.forRoot(),
    AppRoutingModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    ProjectsModule,
    MatGridListModule,
    MatProgressSpinnerModule



  ],
  providers: [
    EnvironmentService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [EnvironmentService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    AuthenticationService,
    HttpClient,
    ProjectsService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
