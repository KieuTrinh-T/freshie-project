import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ec-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss']
})
export class LibrariesComponent {
  constructor(public _router: Router) { }
}
