import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss'],
})
export class CategorySearchComponent implements OnInit {
  items;
  areaid;
  inp;
  mobileno;
  deviceid;
  categorytype;
  categorydata;
  token;
  itemsget;
  categoryNameRecd;
  allcategorydata: any;
  constructor(public modalController: ModalController) {
    this.categoryNameRecd = history.state.categoryNameRecd;
    this.categorydata = history.state.itemsget;
  }
  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.categorydata = this.allcategorydata.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
  popback(categoryNameRecd) {
    let data;
    if (categoryNameRecd === 'Category') {
      data = {
        categoryNameRecd: { name: categoryNameRecd }
      };
    } else {
      data = {
        categoryNameRecd
      };
    }
    this.modalController.dismiss(data);
  }

  ngOnInit() {
    this.allcategorydata = this.categorydata;
  }


}
