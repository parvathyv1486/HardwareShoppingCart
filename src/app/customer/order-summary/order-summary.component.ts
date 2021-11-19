import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private productsService : ProductsService,private router: Router,private dataService : DataService) { }

  public cartItems : any = [];
  public total : number = 0;
  public msg = '';

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
    //userDetails.orders.push(...this.cartItems);
    console.log(userDetails);
    const maxValueOfY = Math.max(...userDetails.orders.map(o => o.id), 0);
    let productArray : any = [];
    
    
    let qty = 1;

    this.cartItems.forEach(element => {
     let arr = productArray.filter(({ id }) => id === element.id)
       //arr.quantity = arr.quantity + 1;
       if(arr.length == 0){
         let arr1 = {id: element.id,quantity: qty}
         productArray.push(arr1);
       }
       else{
         //arr[0].quantity = arr[0].quantity + 1;
         productArray.find(ele=> ele.id == arr[0].id).quantity = arr[0].quantity + 1;
       }
       console.log(productArray)
             
    });
    let orderArray : any = {
      id: maxValueOfY + 1,
      products : productArray
    }
  userDetails.orders.push(orderArray);
    this.productsService.placeOrder(userDetails,userDetails.id).subscribe(res=> {
      localStorage.removeItem('cart');
      this.dataService.notifyCartItemCount.emit();
      this.router.navigate(['/ordersuccess']);
    }) 
   }
}
