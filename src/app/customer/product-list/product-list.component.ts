import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService} from '../../services/products.service';
import { PageEvent } from '@angular/material/paginator';
import {  MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Observable} from 'rxjs';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products : any = [];
  public productsAll : any = [];
  public pName : string = '';
  public itemCnt: number = 0;
  cols = 3;

  length = 1050;
  pageIndex = 0;
  pageSize = 10;

  pageSizeOptions: number[] = [5, 10, 20];

  pageEvent!: PageEvent | void;
  public isLoggedIn : boolean;
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
//localStorage.clear();
if(localStorage.getItem('userDetails')){
  this.isLoggedIn = true;
}
else{
  this.isLoggedIn =  false;
}
this.getCartItems();
    this.getProducts(1,10);
    
  }

  getCartItems(){
    if(localStorage.getItem('cart')){
      this.itemCnt = JSON.parse(localStorage.getItem('cart')).length;
    console.log('cartitems' + this.itemCnt)
    }
  }

  
  getProducts(page: number, pageSize: number){
    this.productService.getProducts(page,pageSize).subscribe(res=>{
      this.products = res;
      this.productsAll = res;
      console.log(this.products)
    });
  }

  getNextPage(event: PageEvent) {
    this.getProducts(event.pageIndex + 1, event.pageSize);
  }

  onLogout(){
    localStorage.removeItem('cart');
    localStorage.removeItem('userDetails');
    this.isLoggedIn = false;
  }

  onSearch(target: any){
    if(target.value && target.value != ''){
       this.productService.getProductsByName(target.value.trim()).subscribe(res=>{
           this.products = res;
       });
      }
      else{
        this.productService.getProducts(1,10).subscribe(res=>{
          this.products = res;
      });
      }
  }

}
