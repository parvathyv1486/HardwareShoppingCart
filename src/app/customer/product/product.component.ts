import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService} from '../../services/products.service';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';

export interface ICart{
  name : string;
  id: number;
  price: number;
  defaultImage: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnInit {

  productId : number;
  product : any = [];
  constructor(
    private route: ActivatedRoute,
    private location: Location,
     private productService : ProductsService,
     private dataService : DataService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = params.id;
      this.getProductById();

    });
  }

  getProductById(){
      this.productService.getProductById(this.productId).subscribe(
        res=>{
          this.product = res;
        }
      )
  }

  addItemToCart(){
    let cartProduct = {
      name : this.product.name,
      id: this.product.id,
      price: this.product.price,
      defaultImage : this.product.defaultImage
    }
    if(localStorage.getItem('cart')){
     // let arrCart : any[] = JSON.parse(localStorage.getItem('cart'));
      var arrCart : Array<ICart> = [];
      arrCart = JSON.parse(localStorage.getItem('cart'));
      arrCart.push(cartProduct);
      localStorage.setItem('cart',JSON.stringify(arrCart));
    }
    else{
      localStorage.setItem('cart',JSON.stringify([cartProduct]));

    }
    
    this.dataService.notifyCartItemCount.emit();

  }

  goBack(){
    this.location.back();
  }
}
