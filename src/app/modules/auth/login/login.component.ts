import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevelopersService } from 'src/app/core/services/developers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private _developersService: DevelopersService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._router.navigate(['/dashboard']);
    }
  }

  login() {
    this._developersService.loginUser(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this._router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
