import { Router } from '@angular/router';
import { Product } from 'src/app/models/products';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CateegoryService } from 'src/app/services/cateegory.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-dashboardtable',
  templateUrl: './dashboardtable.component.html',
  styleUrls: ['./dashboardtable.component.css']
})
export class DashboardtableComponent implements OnInit{
  products: any;
  body: any;
  categories:any;
  constructor (private router:Router,private productService:ProductService,private categorService:CateegoryService, public cookiesService: CookieService){
    if (!(this.cookiesService.get('token'))) {
      this.router.navigateByUrl('/home');
    }
  }
  ngOnInit():void{
    this.productService.getAllProducts(this.cookiesService.get('token')).subscribe((res)=>{
      this.products = res
    })
    
    
    this.categorService.getAllCategories().subscribe((response)=>{
      this.categories = response;
    })
}

  productForm=new FormGroup({
    title:new FormControl('',[]),
    price:new FormControl('',[]),
    quantity:new FormControl('',[]),
    size:new FormControl('',[]),
    color:new FormControl('',[]),
    description:new FormControl('',[]),
    image:new FormControl('',[]),
    categories:new FormControl('',[]),
    smallDescription:new FormControl('',[]),
  })

  base64:any;
getImagePath(e:any){
    const file =e.target.files[0]
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      this.base64 = reader.result;
    }
  }
deleteProductHandler(productId: any)
{
  this.productService.deletProduct(productId,this.cookiesService.get('token')).subscribe((response) => {
    this.products = this.products.filter((product: any) => {
      return product._id != productId;
    })
  })
  }
  product:any={data:{}}
  productID:any
  openUpdateProductForm(prodID:any){
    this.productID=prodID;
    this.productService.getProductDetailsById(prodID).subscribe((response) =>{
      this.product=response
  
    })
  }
  updateFormBody:any
  values:any
  updateproduct(e:any){
    e.preventDefault();
    this.values=this.productForm.value
    const dest = Object.keys(this.values)
    .filter(a => this.values[a] !== null && this.values[a] !== "")
    .reduce((c:any, a) => { c[a] = this.values[a]; return c; }, {});

    this.updateFormBody= {...this.product.data, ...dest };
    this.updateFormBody.id=this.productID;
    this.productService.updateProductByID(this.updateFormBody,this.cookiesService.get('token')).subscribe((res)=>{
      location.reload()
    })

  }
fileChoosen(event:any)
{
  console.log(event.target.files[0])
  const file=event.target.files[0];
  this.productForm.patchValue({image:file});
  this.productForm.get('image')!.updateValueAndValidity();
  
}
}
