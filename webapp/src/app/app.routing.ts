import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
// import { ViewProjectsComponent } from './projects/view-projects/view-projects.component';
import { ScrumBoardComponent } from './projects/scrum-board/scrum-board.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent,  canActivate: [AuthGuard] },
  // { path: 'board', component: ViewProjectsComponent,  canActivate: [AuthGuard] },
  { path: 'board/:project', component: ScrumBoardComponent,  canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent},
  { path: 'logout', component: LogoutComponent},
  // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
