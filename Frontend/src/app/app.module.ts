import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsCategoriesComponent } from './components/products-categories/products-categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ProductComponent } from './components/product/product.component';
import { CatComponent } from './components/cat/cat.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { DashboardtableComponent } from './components/dashboardtable/dashboardtable.component';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';

import { AdminLoginPageComponent } from './components/admin-login-page/admin-login-page.component';
import { FeaturesBarComponent } from './components/features-bar/features-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardcategoryComponent } from './components/dashboardcategory/dashboardcategory.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';



const routes:Routes=[
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'adminlogin',component:AdminLoginPageComponent},
  {path:'dashboard',component:DashboardPageComponent},
  {path:'dashboard/addproduct',component:DashboardComponent},
  {path:'dashboard/categories',component:DashboardcategoryComponent},
  {path:'dashboard/addcategory',component:AddcategoryComponent},
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'cart',component:CartComponent},
  {path:'products',component:ProductsCategoriesComponent},
  {path:'products/:id',component:ProductsCategoriesComponent},
  {path:'product/:id',component:ProductDetailsComponent},
  {path:'**',component:NotFoundComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    HomeComponent,
    CartComponent,
    FooterComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProductsCategoriesComponent,
    ProductDetailsComponent,
    ProductComponent,
    CatComponent,
    DashboardComponent,
    DashboardPageComponent,
    DashboardtableComponent,
    DashboardNavComponent,
    AdminLoginPageComponent,
    FeaturesBarComponent,
    NotFoundComponent,
    DashboardcategoryComponent,
    AddcategoryComponent,

  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule ,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
