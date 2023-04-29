import { Component } from '@angular/core';
import { ProductService, SharedService } from '@common/services';
import { StateService } from './../../../common/state/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  categories = [
    { name: 'Category 1', image: 'https://picsum.photos/200/300' },
    { name: 'Category 2', image: 'https://picsum.photos/200/300' },
    { name: 'Category 3', image: 'https://picsum.photos/200/300' },
    { name: 'Category 4', image: 'https://picsum.photos/200/300' },
    { name: 'Category 5', image: 'https://picsum.photos/200/300' },
    { name: 'Category 6', image: 'https://picsum.photos/200/300' },
  ]
  constructor(
    private _sharedService: SharedService,
  ) {
  }

  sharedData() {
    this._sharedService.sharedData({ type: "reload" })
  }
}
