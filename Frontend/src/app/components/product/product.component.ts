import { Component,EventEmitter,Input, Output } from '@angular/core';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
 @Input() childproductsofcategory:any;
 @Output() newItemEvent = new EventEmitter<string>();
  nItems:any
 constructor (private cartService: CartService) {}
addToCart(product: Product) {
  product.itemQuantity=1
  this.cartService.addToCart(product);
  this.nItems=this.cartService.countItems()
  this.newItemEvent.emit(this.nItems)
}
}
