import { CartService } from 'src/app/services/cart.service';
import { CartComponent } from './../cart/cart.component';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId:any
  product:any
  nItems:any
constructor(private cartService:CartService,private activeRoute:ActivatedRoute,private productService:ProductService){
  this.productId=this.activeRoute.snapshot.params['id'];

}
  ngOnInit(): void {
    this.productService.getProductDetailsById(this.productId).subscribe((res)=>{
      this.product=res
      console.log(this.product)
    })
    this.nItems=this.cartService.countItems()
  }
  addToCart(product:any){
    product.itemQuantity=1
    this.cartService.addToCart(product);
    this.nItems=this.cartService.countItems()
  }
}
