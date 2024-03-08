import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Notification } from 'src/app/core/interfaces/notification';
import { DevelopersService } from 'src/app/core/services/developers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  notifications: Notification[] = [];
  constructor(
    private _developersService: DevelopersService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._developersService.getNotificaction().subscribe((res) => {
      this.notifications = res;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
    this._toastr.success('Sesión cerrada correctamente', 'Éxito');
  }
}
