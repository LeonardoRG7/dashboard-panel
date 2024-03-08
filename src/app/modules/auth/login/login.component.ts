import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._router.navigate(['/dashboard']);
    }
  }

  login() {
    this._developersService.loginUser(this.username, this.password).subscribe(
      (response) => {
        if (response && response.length > 0) {
          localStorage.setItem('token', JSON.stringify(response)); // Guardamos el token en el localStorage para mantener nuestra session
          this._router.navigate(['/dashboard']);
          this._toastr.success('Inicio de sesión exitoso', 'Éxito');
        } else {
          this._toastr.error('Credenciales inválidas', 'Error');
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this._toastr.error('Error al iniciar sesión', 'Error');
      }
    );
  }
}
