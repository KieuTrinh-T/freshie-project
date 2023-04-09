import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ec-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  title = 'admindashboard';

  constructor(private elementRef: ElementRef, public _router: Router) { }

  ngOnInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
