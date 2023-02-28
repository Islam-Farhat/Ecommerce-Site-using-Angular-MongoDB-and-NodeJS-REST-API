import { Injectable } from '@angular/core';
import { Product } from '../models/products';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = []
  isFound:boolean=false
  addToCart(product: Product) {
    this.isFound=false
    this.items.forEach(element => {
      if(element._id==product._id){
        element.itemQuantity++
        this.isFound=true
      }
    });
    if(!this.isFound){
      this.items.push(product);
      localStorage.setItem('items','this.items')
      localStorage.setItem('nitems','this.items.length')
    }

  }
  countItems(){
    return this.items.length
  }
  getItems() {
    return this.items;
  }
  removeItem(product:Product){
    this.items=this.items.filter((item,i)=>product!=item)
    return this.items
  }

  clearCart() {
    this.items = [];
    localStorage.setItem('items','this.items')
    localStorage.setItem('nitems','this.items.length')
    return this.items;
  }
  
}
