import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/common/services/admin.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'ec-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  public formGroup: FormGroup = new FormGroup({});

  constructor(private adminService: UserService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar ) { }
  ngOnInit(){
    if(localStorage.getItem('admin') != null){
      this.adminService._admin = JSON.parse(localStorage.getItem('admin') as string);
      this.formGroup = this.fb.group({
        email: new FormControl(this.adminService._admin.email, [Validators.required]),
        password: new FormControl(this.adminService._admin.password, [Validators.required]),
        remember: new FormControl(true)
      });

    }
    else{
    this.formGroup = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(false)
    });
  }
  }

  submit() {
    if (this.formGroup.valid) {
      this.adminService.signin$(this.formGroup.controls['email'].value,this.formGroup.controls['password'].value).subscribe((data: any) => {
        if(data == ''){
          if(this.formGroup.value.remember){
            localStorage.setItem('admin', JSON.stringify(this.adminService._admin));
          }
          this.snackBar.open('Đăng nhập thành công', 'Đóng',{
            panelClass: ['snackbar'],
            duration: 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          this.router.navigate(['/admin']);
        }else{
          console.log(data);
          this.snackBar.open(data, 'Đóng',{
            panelClass: ['snackbar'],
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
        }

      })
    }

  }
}
