import { Component } from '@angular/core';
import { BaseComponent } from '@common/base';
import { SharedService } from '@common/services';
import { StateService } from './../../../common/state/state.service';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {

  categories = [
    { name: 'Category 1', image: 'https://picsum.photos/200/300' },
    { name: 'Category 2', image: 'https://picsum.photos/200/300' },
    { name: 'Category 3', image: 'https://picsum.photos/200/300' },
    { name: 'Category 4', image: 'https://picsum.photos/200/300' },
    { name: 'Category 5', image: 'https://picsum.photos/200/300' },
    { name: 'Category 6', image: 'https://picsum.photos/200/300' },
  ]
  constructor(
    override _state: StateService<AppState>,
    private _sharedService: SharedService
  ) {
    super(_state);
  }

  sharedData() {
    this._sharedService.sharedData({ type: "reload" })
  }
}
