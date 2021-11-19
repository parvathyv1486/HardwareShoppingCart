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
    this.dataService.notifyCartItemCount.subscribe({
      next: () => {
        this.getCartItems();
      }
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('userDetails')){
      this.isSignIn = true;
    }
    else{
      this.isSignIn =  false;
    }
    this.getCartItems();
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
  }

}
