import { Component, OnInit } from '@angular/core';
import { ProductsService} from '../../services/products.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  public products : any = [];
  public productsAll : any = [];
  public pName : string = '';
  length = 1050;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent!: PageEvent | void;
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
    this.getProducts(1,10);
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

  onEdit(item){
    console.log('item')
    console.log(item)
  }

  onDelete(item){
    this.productService.deleteProduct(item.id).subscribe(res=>{
      console.log(this.products)
      this.getProducts(1,100);
    });
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
