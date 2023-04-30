import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@common/services';
import {  ProductDetail } from 'src/app/common/models/product';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'ec-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {

  product = new ProductDetail();
  constructor(private activateRoute: ActivatedRoute, private _productService: ProductService ) {
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
        {next:(res)=>{console.log(res)},
        error:(err)=>{console.log(err)}}
      )

    }

}
