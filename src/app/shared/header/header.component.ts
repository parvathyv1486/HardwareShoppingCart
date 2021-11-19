import { Component, OnInit } from '@angular/core';
import { Router,Event, NavigationEnd } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isSignIn : boolean = false;
  isLoginComponent : boolean = false;
  isAddProductComponent : boolean = false;
  isAdmin : boolean = false;
  public itemCnt: number = 0;

  constructor(private router: Router,private dataService : DataService) { 
    this.router.events.subscribe((event: Event) => {
      //  console.log(event); //based on this change class
        if(event instanceof NavigationEnd){
          if(event.url == '/login'){
            this.isLoginComponent = true;
          }
        }
  });
  this.router.events.subscribe((event: Event) => {
    //  console.log(event); //based on this change class
      if(event instanceof NavigationEnd){
        if(event.url == '/addProduct'){
          this.isAddProductComponent = true;
        }
        else{
          this.isAddProductComponent = false;
        }
      }
});

    this.dataService.notifyCartItemCount.subscribe({
      next: () => {
        this.getCartItems();
      }
    });
    this.dataService.notifySignIn.subscribe({
      next: () => {
        this.getuserDetails();
      }
    });
  }

  ngOnInit(): void {
    this.getuserDetails();
    this.getCartItems();
  }

  getuserDetails(){
    if(localStorage.getItem('userDetails')){
      this.isSignIn = true;
      let userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if(userDetails.role == 'ADMIN'){
        this.isAdmin = true;
      }
      else{
        this.isAdmin = false;
      }
    }
    else{
      this.isSignIn =  false;
    }
  }

  getCartItems(){
    if(localStorage.getItem('cart')){
      this.itemCnt = JSON.parse(localStorage.getItem('cart')).length;
    console.log('cartitems' + this.itemCnt)
    }
  }

  onLogout(){
    localStorage.removeItem('cart');
    localStorage.removeItem('userDetails');
    localStorage.clear();
    this.isSignIn = false;
    this.isAdmin = false;
    this.isLoginComponent = false;
    this.isAddProductComponent= false;
    this.getuserDetails();
  }

}
