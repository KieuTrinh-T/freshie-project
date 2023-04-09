import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ec-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
  token = "token-abc";

  constructor(
    private __router: Router,
  ) { }

  ngOnInit() {
    console.log("verify token...")
    this.__verifyAccessToken();
  };

  __verifyAccessToken() {
    if (this.token) {
      this.token && this.__navToDashBoard();
    } else {
      this.__restartApp();
    }
  }

  __navToDashBoard() {
    console.log('go dashboard')
    this.__router.navigate(['/admin/dashboard']);
  }

  __navToLogin() {
    this.__router.navigate(['admin/login']);
  }

  __restartApp() {
    this.__navToLogin();
  }
}
