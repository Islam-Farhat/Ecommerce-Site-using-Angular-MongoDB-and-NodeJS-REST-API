import { CookieService } from 'ngx-cookie-service';
import { CateegoryService } from 'src/app/services/cateegory.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboardcategory',
  templateUrl: './dashboardcategory.component.html',
  styleUrls: ['./dashboardcategory.component.css']
})
export class DashboardcategoryComponent implements OnInit{
categories:any
category:any
values:any
updateFormBody:any
categoryID:any
constructor(private categoryService:CateegoryService,private cookiesService:CookieService){}
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(res=>{
      this.categories=res
    })
  }
  categoryForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    icon:new FormControl('',[Validators.required])
  })
  deleteCategory(id:any){
    this.categoryService.deleteCategory(id,this.cookiesService.get('token')).subscribe((response) => {
      this.categories = this.categories.filter((category: any) => {
        return category._id != id;
      })
    })
  }
  updateOneCategory(id:any){
    this.categoryID=id
    this.categoryService.getCategoryById(id,this.cookiesService.get('token')).subscribe(res=>{
      this.category=res;
    })
  }
  updateCategory(e:any){
    e.preventDefault();
    this.values=this.categoryForm.value
    const dest = Object.keys(this.values)
    .filter(a => this.values[a] !== null && this.values[a] !== "")
    .reduce((c:any, a) => { c[a] = this.values[a]; return c; }, {});

    this.updateFormBody= {...this.category, ...dest };
    this.updateFormBody.id=this.categoryID;
    console.log(this.updateFormBody)
    this.categoryService.updateCategory(this.updateFormBody,this.cookiesService.get('token')).subscribe((res)=>{
      location.reload()
    })
  }
  fileChoosen(event:any)
  {
    console.log(event.target.files[0])
    const file=event.target.files[0];
    this.categoryForm.patchValue({icon:file});
    this.categoryForm.get('icon')!.updateValueAndValidity();
    
  }
}
