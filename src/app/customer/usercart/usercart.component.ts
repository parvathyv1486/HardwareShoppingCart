import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; 
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.scss']
})
export class UsercartComponent implements OnInit {

  public cartItems : any = [];
  public total : number = 0;
  public msg = '';
  constructor(private router: Router, private dataService : DataService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(){
    this.total = 0;
   this.cartItems = JSON.parse(localStorage.getItem('cart'));
   if(this.cartItems && this.cartItems.length > 0){
    this.cartItems.forEach(a => this.total += a.price);
    this.msg = '';
   }
   else{
     this.msg = "Cart is empty";
   }

  }

  onCheckout(){
    if(localStorage.getItem('userDetails')){
      this.router.navigate(['/orderSummary']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  onRemove(item,i){
    let items = JSON.parse(localStorage.getItem('cart'));
    items.splice(i,1);
   // items = items.filter(({ id }) => id !== item.id);        
    console.log(items);
    localStorage.setItem('cart',JSON.stringify(items));
    this.getCartItems();
    this.dataService.notifyCartItemCount.emit();
  }
}
