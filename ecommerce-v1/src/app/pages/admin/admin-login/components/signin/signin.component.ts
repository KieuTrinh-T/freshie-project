import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAdmin } from 'src/app/common/models/user.model';
import { AdminService } from 'src/app/common/services/admin.service';

@Component({
  selector: 'ec-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public formGroup: FormGroup = new FormGroup({});

  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar ) { }
  ngOnInit(){
    console.log(this.adminService.adminRemember);
    if(this.adminService.adminRemember.username != '' && this.adminService.adminRemember.password != ''){
      this.formGroup = this.fb.group({
        email: new FormControl(this.adminService.adminRemember.username, [Validators.required]),
        password: new FormControl(this.adminService.adminRemember.password, [Validators.required]),
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
      this.adminService.signin$(this.formGroup.controls['email'].value,this.formGroup.controls['password'].value).subscribe(
        {next: (res) => {
          console.log(res);
            if(res.value != null){
              console.log(res.value);
              this.adminService.setAdmin(res.value as IAdmin)
              if(this.formGroup.controls['remember'].value){
                this.adminService.setAdminRemember(this.formGroup.controls['email'].value,this.formGroup.controls['password'].value);
              }
              this.snackBar.open("Login successfully","",{duration:1000})
              this.router.navigate(['admin']);
            }
            else{
              console.log(res['message']);
              this.snackBar.open(res['message'],"",{duration:3000})
            }
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open(err.error.message,"",{duration:3000})
          }
        }
      )
    }

  }
}
