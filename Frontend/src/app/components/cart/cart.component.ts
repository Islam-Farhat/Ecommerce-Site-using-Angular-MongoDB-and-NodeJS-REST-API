import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  items=this.cartService.getItems()
  total:any;
  nItems:any
  quantityElement:any;
  loginflag: boolean = false;
  emptyflag: boolean = false;
  calTotal() {
    this.total=0
    this.items.forEach(element => {
      this.total+=element.price*element.itemQuantity
    });
  }
  constructor(private cartService:CartService , public cookiesService: CookieService,private router:Router){
    this.calTotal();
  }
  ngOnInit(): void {
    this.nItems=this.cartService.countItems()
  }

  increaseQuantity(e:any,i:any){
    this.quantityElement=e.target.parentNode.parentNode.querySelector('input[type=number]')
    this.quantityElement.stepUp()
    this.items[i].itemQuantity=this.quantityElement.value
    this.calTotal()
  }
  decreaseQuantity(e:any,i:any){
    this.quantityElement=e.target.parentNode.parentNode.querySelector('input[type=number]')
    this.quantityElement.stepDown()
    this.items[i].itemQuantity=this.quantityElement.value
    this.calTotal()
  }
  removeItem(product:any){
    this.items=this.cartService.removeItem(product)
    this.calTotal()
    this.nItems=this.cartService.countItems()
  }
  forceLogin() {

    if (!this.nItems) {
      this.emptyflag = true;
    } else {
      if (!(this.cookiesService.get('userToken'))) {
      this.router.navigateByUrl('/login');
     } else {
        this.loginflag = true;
       this.cartService.clearCart();
       this.items=[]

    }
    }


  }
}
