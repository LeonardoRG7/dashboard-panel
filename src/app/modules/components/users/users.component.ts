import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/interfaces/user';
import { UsersService } from 'src/app/core/services/users.service';
import { CreateUserPreviewComponent } from './components/create-user-preview/create-user-preview.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userId: string | undefined;

  constructor(
    private _userService: UsersService,
    private _dialog: MatDialog,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._userService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  createUser() {
    this._dialog.open(CreateUserPreviewComponent, {
      maxWidth: '35vw',
      maxHeight: '38vw',
      width: '100%',
      height: '100%',
      panelClass: 'create-user-dialog',
    });
  }

  editUser(user: User) {
    this._dialog.open(CreateUserPreviewComponent, {
      maxWidth: '35vw',
      maxHeight: '45vw',
      width: '100%',
      height: '100%',
      panelClass: 'edit-user-dialog',
      data: {
        user: user,
        userId: user?.id,
      },
    });
  }

  deleteUser(id?: string) {
    if (id) {
      this._userService.deleteUsers(id).subscribe((res) => {
        this.ngOnInit();
        this._toastr.success('Usario eliminado con éxito!');
      });
    } else {
      console.error('ID is undefined or null');
    }
  }
}
