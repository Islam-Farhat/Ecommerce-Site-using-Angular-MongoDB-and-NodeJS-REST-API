import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Component,OnInit } from '@angular/core';
import { CateegoryService } from 'src/app/services/cateegory.service';
import { ProductService } from 'src/app/services/product.service';
import { CookieService } from 'ngx-cookie-service';
// import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrls: ['./products-categories.component.css']
})
export class ProductsCategoriesComponent implements OnInit {
  nItems:any
  categories:any;
  productsofCategory:any;
  navItems:any=document.getElementsByClassName('slide-item');
  constructor(public activeRoute:ActivatedRoute,public categoryservice:CateegoryService,public productservice:ProductService,public cartService:CartService){}

ngOnInit(): void {
  if(this.activeRoute.snapshot.params['id']){
    this.categoryservice.getAllCategories().subscribe((response)=>{
      this.categories=response;
      this.ShowProducts(this.activeRoute.snapshot.params['id'])
    })
  }else{
    this.categoryservice.getAllCategories().subscribe((response)=>{
      this.categories=response;
      this.ShowProducts(this.categories[0]?._id)
    })
  }
  this.nItems=this.cartService.countItems()
}

addItem(e:any){
  this.nItems=e;
}

ShowProducts(id:any)
{
  this.productservice.getProductswithCategoryID(id).subscribe((response)=>{
    this.productsofCategory=response;
  })
}

//Get id from component cat(child)
getIdCategory(categoryid:any,i:any)
{
  for (const item of this.navItems) {
    if(item.classList.contains('active')){
      item.classList.remove('active')
    }
  }
  this.navItems[i].classList.add("active")
  this.ShowProducts(categoryid)
}
}
