import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/core/interfaces/notification';
import { DevelopersService } from 'src/app/core/services/developers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  notifications: Notification[] = [];
  constructor(private _developersService: DevelopersService) {}

  ngOnInit(): void {
    this._developersService.getNotificaction().subscribe((res) => {
      this.notifications = res;
    });
  }
}
