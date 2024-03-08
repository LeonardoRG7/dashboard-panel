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
export class CreateUserPreviewComponent {
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

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _userService: UsersService,
    public dialogRef: MatDialogRef<CreateUserPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User; userId: string }
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

  createUser() {
    const USER: User = {
      name: this.userForm.get('name')?.value,
      last_name: this.userForm.get('last_name')?.value,
      rol: this.userForm.get('rol')?.value,
      list: this.userForm.get('developers')?.value,
      area: this.userForm.get('ci')?.value,
      url_photo:
        'https://leonardoriascosportafolio.netlify.app/img/Leonardo.png',
    };

    if (!this.userForm.invalid) {
      this._userService.createUser(USER).subscribe(
        (data) => {
          this.closeModal();
          this._toastr.success('Usuario creado con exito!');
        },
        (error) => {
          console.log(error);
          this.userForm.reset();
        }
      );
    } else {
      this._toastr.error('Error en formuarlio');
    }
  }

  isUpdate() {
    if (this.userId !== null) {
      this.userForm.patchValue({
        name: this.data.user.name,
        last_name: this.data.user.last_name,
        rol: this.data.user.rol,
        list: this.data.user.list.split('|'),
      });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
