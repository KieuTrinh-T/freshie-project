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
    { name: 'Skincare', image: 'https://us.123rf.com/450wm/bsd555/bsd5551911/bsd555191102318/134926483-beauty-and-personal-care-pink-flat-design-long-shadow-glyph-icon-makeup-products-decorative.jpg?ver=6' },
    { name: 'Perfume', image: 'https://cdn-icons-png.flaticon.com/512/5735/5735681.png' },
    { name: 'Makeup', image: 'https://cdn-icons-png.flaticon.com/512/4171/4171139.png' },
    { name: 'Haircare', image: 'https://img.freepik.com/premium-vector/hair-care-treatment-products_316839-4662.jpg?w=2000' },
    { name: 'Hygiene', image: 'https://cdn3d.iconscout.com/3d/premium/thumb/hygiene-wash-6170950-5073528.png' },
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
