import { CartService } from './../../services/cart.service';
import { CateegoryService } from './../../services/cateegory.service';
import { Component,OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  categories:any
  featured:any
  nItems:any
  constructor (private productService:ProductService,private categoryService:CateegoryService,private cartService: CartService) {
  }
  addToCart(product: Product) {
    product.itemQuantity=1
    this.cartService.addToCart(product);
    this.nItems=this.cartService.countItems()
  }
  ngOnInit():void{
    this.categoryService.getAllCategories().subscribe((res)=>{
      this.categories=res
    })
    this.productService.getFeaturedProducts().subscribe((res)=>{
      this.featured=res
      this.featured=this.featured.Products
    })
    this.nItems=this.cartService.countItems()
  }
}
