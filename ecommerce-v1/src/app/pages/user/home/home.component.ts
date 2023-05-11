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
    { name: 'Skincare', image: 'https://us.123rf.com/450wm/bsd555/bsd5551911/bsd555191102318/134926483-beauty-and-personal-care-pink-flat-design-long-shadow-glyph-icon-makeup-products-decorative.jpg?ver=6' },
    { name: 'Perfume', image: 'https://cdn-icons-png.flaticon.com/512/5735/5735681.png' },
    { name: 'Makeup', image: 'https://cdn-icons-png.flaticon.com/512/4171/4171139.png' },
    { name: 'Haircare', image: 'https://img.freepik.com/premium-vector/hair-care-treatment-products_316839-4662.jpg?w=2000' },
    { name: 'Hygiene', image: 'https://cdn3d.iconscout.com/3d/premium/thumb/hygiene-wash-6170950-5073528.png' },
  ]
  constructor(
    private _sharedService: SharedService,
  ) {
  }

  sharedData() {
    this._sharedService.sharedData({ type: "reload" })
  }
}
