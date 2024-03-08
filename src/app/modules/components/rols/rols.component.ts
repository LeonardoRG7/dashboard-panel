import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/core/interfaces/rol';
import { DevelopersService } from 'src/app/core/services/developers.service';

@Component({
  selector: 'app-rols',
  templateUrl: './rols.component.html',
  styleUrls: ['./rols.component.css'],
})
export class RolsComponent implements OnInit {
  rols: Rol[] = [];
  constructor(private _developersService: DevelopersService) {}

  ngOnInit(): void {
    this._developersService.getRols().subscribe((res) => {
      this.rols = res;
    });
  }
}
