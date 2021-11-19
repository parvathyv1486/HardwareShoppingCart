import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent} from './customer/product-list/product-list.component';
import { ProductComponent } from './customer/product/product.component';
import { UsercartComponent} from './customer/usercart/usercart.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { OrderSummaryComponent } from './customer/order-summary/order-summary.component';
import { AllProductsComponent } from './admin/all-products/all-products.component';
import {HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {path : '',pathMatch:'full', redirectTo:'productList'},
  {path:'productList',component: ProductListComponent},
  {path:'product',component: ProductComponent},
  {path:'userCart', component: UsercartComponent},
  {path:'login', component: LoginComponent},
  {path:'orderSummary', component: OrderSummaryComponent},
  {path:'addProduct', component: AddProductComponent},
  {path:'allProducts', component: AllProductsComponent},
  {path:'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
