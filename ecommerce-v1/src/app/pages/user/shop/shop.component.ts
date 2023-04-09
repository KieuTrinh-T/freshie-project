import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ec-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  typeOfCategories = ['Skincare','Make up','Haircare','Perfume','Hygiene'];

  filterForm = new FormGroup({
    categories: new FormControl(),
    price: new FormControl('Low to High'),
  })

  @ViewChild('category') category!: MatSelectionList;

  constructor() {
   }

   ngAfterViewInit() {
    console.log(this.category.registerOnChange)
    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      console.log(value)
    })
   }

   onSelection($event: MatSelectionListChange,arg1: SelectionModel<MatListOption>) {
    console.log($event)
    console.log(arg1.selected.map(option => option.value))
    this.filterForm.patchValue({
      categories: arg1.selected.map(option => option.value)
    })
    console.log(this.filterForm.value)
  }
}
