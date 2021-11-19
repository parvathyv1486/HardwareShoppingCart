import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { ProductListComponent } from './customer/product-list/product-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule} from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { ProductComponent } from './customer/product/product.component';
import { UsercartComponent } from './customer/usercart/usercart.component';
import {MatListModule} from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import { OrderSummaryComponent } from './customer/order-summary/order-summary.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AllProductsComponent } from './admin/all-products/all-products.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './shared/home/home.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { OrdersuccessComponent } from './shared/ordersuccess/ordersuccess.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
    UsercartComponent,
    LoginComponent,
    OrderSummaryComponent,
    AddProductComponent,
    AllProductsComponent,
    HeaderComponent,
    HomeComponent,
    OrdersuccessComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatBadgeModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
