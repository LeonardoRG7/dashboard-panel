import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './modules/error/error-page/error-page.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { CreateProjectPreviewComponent } from './modules/components/projects/components/create-project-preview/create-project-preview.component';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './modules/components/projects/projects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CreateUserPreviewComponent } from './modules/components/users/components/create-user-preview/create-user-preview.component';
import { UsersComponent } from './modules/components/users/users.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeaderComponent } from './modules/components/header/header.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RolsComponent } from './modules/components/rols/rols.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    LoginComponent,
    DashboardComponent,
    CreateProjectPreviewComponent,
    ProjectsComponent,
    CreateUserPreviewComponent,
    UsersComponent,
    HeaderComponent,
    RolsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [ToastrService],
  bootstrap: [AppComponent],
})
export class AppModule {}
