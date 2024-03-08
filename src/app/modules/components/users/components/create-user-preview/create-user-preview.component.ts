import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/interfaces/user';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-create-user-preview',
  templateUrl: './create-user-preview.component.html',
  styleUrls: ['./create-user-preview.component.css'],
})
export class CreateUserPreviewComponent implements OnInit {
  userForm: FormGroup;
  userId: string | null;

  tecnologiesTech: string[] = [
    'React',
    'React Native',
    'VueJs',
    'Angular',
    '.Net',
    'Java',
    'Python',
    'NodeJs',
    ' SQLServer',
    'MongoDB',
    'PostgresSQL',
  ];

  areas: string[] = ['Staff', 'Fabrica', 'Soporte'];

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _userService: UsersService,
    public dialogRef: MatDialogRef<CreateUserPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User; userId: string | null }
  ) {
    this.userForm = this._fb.group({
      name: ['', Validators.required],
      last_name: ['', [Validators.required]],
      rol: ['', Validators.required],
      list: ['', Validators.required],
      area: ['', Validators.required],
    });

    this.userId = this.data ? this.data.userId : null;
  }

  ngOnInit(): void {
    this.isUpdate();
  }

  createUser() {
    const USER: User = {
      name: this.userForm.get('name')?.value,
      last_name: this.userForm.get('last_name')?.value,
      rol: this.userForm.get('rol')?.value,
      list: this.userForm.get('list')?.value.join('|'),
      area: this.userForm.get('area')?.value,
      url_photo:
        'https://leonardoriascosportafolio.netlify.app/img/Leonardo.png',
    };

    if (this.userId) {
      this._userService.updateUsers(this.userId, USER).subscribe(
        (data) => {
          this.closeModal();
          this._toastr.info('Usuario actualizado!', 'Correctamente!');
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      if (!this.userForm.invalid) {
        this._userService.createUser(USER).subscribe(
          (data) => {
            this.closeModal();
            this._toastr.success('Usuario creado!', 'Correctamente');
            this.ngOnInit();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this._toastr.error('Error en formuarlio');
      }
    }
  }

  isUpdate() {
    if (this.userId !== null) {
      const user = this.data.user;

      this.userForm.patchValue({
        name: user.name,
        last_name: user.last_name,
        rol: user.rol,
        list: user.list ? user.list.split('|').map((list) => list.trim()) : [],
        area: user.area,
      });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
