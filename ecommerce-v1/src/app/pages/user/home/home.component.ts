import { Component, OnInit } from '@angular/core';
import { ProductService, SharedService } from '@common/services';
import { StateService } from './../../../common/state/state.service';
import { DialogComponent } from '../../admin/dialog/dialog.component';
import { CartService } from 'src/app/common/services/cart.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories = [
    { name: 'Sửa rửa mặt', image: 'https://media.hasaki.vn/catalog/category/19_2_img_250x250_8e0796_fit_center.jpg' },
    { name: 'Kem dưỡng', image: 'https://media.hasaki.vn/catalog/category/9_img_250x250_8e0796_fit_center.jpg' },
    { name: 'Son', image: 'https://salt.tikicdn.com/cache/280x280/ts/product/7c/7e/b4/c8733758450e71c6e5ea357f4e9486c9.jpg' },
    { name: 'Trang điểm', image: 'https://salt.tikicdn.com/cache/280x280/ts/product/9e/50/8c/918a77ca759544b4b19c4de0d83cd9c8.jpg' },
    { name: 'Kem chống nắng', image: 'https://salt.tikicdn.com/cache/280x280/ts/product/0a/ee/58/fa2d2a95feb0a491d105873e028b6a0d.png' },
    { name: 'Nước hoa', image: 'https://salt.tikicdn.com/cache/280x280/ts/product/83/6e/1b/8843eeacf0b2d4526bce3639530d88d0.jpg' },
    { name: 'Sữa tắm', image: 'https://media.hasaki.vn/catalog/category/26_1_img_250x250_8e0796_fit_center.jpg' },
    { name: 'Dưỡng tóc', image: 'https://media.hasaki.vn/catalog/category/137_2_img_250x250_8e0796_fit_center.jpg' },

  ]

  constructor(
    private _sharedService: SharedService,
    private _cartService: CartService,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  sharedData() {
    this._sharedService.sharedData({ type: "reload" })
  }

  viewDetail(id: string) {
    console.log(id);
    this.router.navigate([`/product-detail/${id}`])
  }

  addToCart(product_id: string) {
    console.log(product_id, 1);
    this._cartService.addToCart$(product_id, 1).subscribe((response: any) => {
      console.log(response);
      const dialogref = this.dialog.open(DialogComponent,{
        data: {
          title: "Thêm vào giỏ hàng thành công!",
          message: 'Bạn có muốn xem giỏ hàng ?',
        }
      });
      dialogref.afterClosed().subscribe((result: any) => {
        if(result){
          console.log(result);
          this.router.navigate(['/cart']);
        }
      }
      )
    });

  }
}
