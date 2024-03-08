import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './modules/error/error-page/error-page.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { ProjectsComponent } from './modules/components/projects/projects.component';
import { UsersComponent } from './modules/components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
