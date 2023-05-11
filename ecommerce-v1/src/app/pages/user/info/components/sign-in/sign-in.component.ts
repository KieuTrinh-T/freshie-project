import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@common/models';
import { UserService } from 'src/app/common/services/user.service';
import { CartService } from 'src/app/common/services/cart.service';

// custom validator to check password
export function passwordValidator(control: FormControl): ValidationErrors | null {
  const password = control.value;
  // check if password contains at least one number
  const hasNumber = /\d/.test(password);
  // check if password contains at least one letter
  const hasLetter = /[a-zA-Z]/.test(password);
  // check if password contains at least one special character
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  // check if password contains at least 8 characters
  const hasMinLength = password?.length >= 8;
  return hasNumber && hasLetter && hasSpecialCharacter && hasMinLength ? null : { password: true };
}

// custom validator to check confirm password
export function confirmPasswordValidator(control: FormControl): ValidationErrors | null {
  const confirmPassword = control.value;
  const password = control.root.get('password');
  return password && confirmPassword === password.value ? null : { confirmPassword: true };
}

@Component({
  selector: 'ec-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  controlTab = new FormControl(0);

  signInForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, passwordValidator]),
  });

  signUpForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    password: new FormControl('', [Validators.required, passwordValidator]),
    confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator]),
  });

  constructor(private _userService: UserService,
    private router: Router,
    private _cartService: CartService
    ) { }

  signIn() {
    console.log(this.signInForm);
    // check if form is valid
    if (this.signInForm.invalid) {
      return;
    }
    const { username, password } = (this.signInForm.value as any);
    this._userService.signin$(username, password).subscribe({
      next: (res: any) => {
        // reset form
        this.signInForm.patchValue({
          username: '',
          password: '',
        });
        this.router.navigate(['/']);
        this._userService.setUser$(res.value);
        // save carts from local storage to database
        this._cartService.saveCarts$(res.value._id)
      },
      error: (err: any) => {
        console.log(err.error.message);
        // show snackbar
        alert(err.error.message);
      }
    });
  }

  signUp() {
    console.log(this.signUpForm);
    // check if form is valid
    if (this.signUpForm.invalid) {
      return;
    }
    const { username, email,phone, password } = (this.signUpForm.value as any);

    console.log(this.signUpForm.value as any);

    this._userService.signup$(username, email,phone, password).subscribe((res: any) => {
      this.controlTab.setValue(0);
      // reset form
      this.signUpForm.patchValue({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
      console.log(this.controlTab.value)
    });
  }
}
