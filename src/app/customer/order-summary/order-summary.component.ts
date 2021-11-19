import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private productsService : ProductsService) { }

  public cartItems : any = [];
  public total : number = 0;

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(){
    this.cartItems = JSON.parse(localStorage.getItem('cart'));
    console.log('cart items')
    console.log(this.cartItems)
    this.cartItems.forEach(a => this.total += a.price);
   }

   placeOrder(){
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    userDetails.orders.push(...this.cartItems);
    console.log(userDetails);
    this.productsService.placeOrder(userDetails,userDetails.id).subscribe(res=> {
      
    })
   }
}
