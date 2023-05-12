import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '@common/services';
import {  ProductDetail } from 'src/app/common/models/product';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'ec-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {

  categories = [
    {id: '1594', name:"hygiene"},
    {id: '1591', name:"haircare"},
    {id: '1584', name:"makeup"},
    {id: '1595', name:"perfume"},
    {id:'1582', name:"skincare"}
  ]
  product = new ProductDetail();
  constructor(private activateRoute: ActivatedRoute, private _productService: ProductService, private dialog: MatDialog, private _router: Router ) {

    this.activateRoute.params.subscribe(
      (params) => {
        let id = params['id'];
        if(id){
          console.log(id);
          this._productService.getProductById(id).subscribe(
            {next:(res)=>{this.product = res.value},
            error:(err)=>{console.log(err)}}
          )
        }

      }
    )
   }
   onFileChange(event:any){
    const file = event.target.files[0];
    console.log(file);}



    editorConfig: AngularEditorConfig = {
      editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '0',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
          {class: 'arial', name: 'Arial'},
          {class: 'times-new-roman', name: 'Times New Roman'},
          {class: 'calibri', name: 'Calibri'},
          {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],
        customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'v1/image',
      // upload: (file: File) => { ... }
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['bold', 'italic'],
        ['fontSize']
      ]

    };

    updateProduct()
    {
      this._productService.updateProduct(this.product._id,this.product).subscribe(
        {next:(res)=>{console.log(res),
          this.dialog.open(DialogComponent, {
            data: {title: 'Thông báo', message: "Đã cập nhật sản phẩm thành công"},
          });},
        error:(err)=>{console.log(err)
        this.dialog.open(DialogComponent, {
          data: {title: 'Thông báo', message: "Đã xảy ra lỗi khi cập nhật sản phẩm: " + err.error.message},
        });

        }}
      )

    }
    changeThumb(event: any, product: ProductDetail) {
      let me = this;
      let file = event.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
         product.thumb= reader.result!.toString()
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    changeImage1(event: any, product: ProductDetail) {
      let me = this;
      let file = event.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
         product.image_1= reader.result!.toString()
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    changeImage2(event: any, product: ProductDetail) {
      let me = this;
      let file = event.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
         product.image_2= reader.result!.toString()
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    changeImage3(event: any, product: ProductDetail) {
      let me = this;
      let file = event.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
         product.image_3= reader.result!.toString()
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }

}
