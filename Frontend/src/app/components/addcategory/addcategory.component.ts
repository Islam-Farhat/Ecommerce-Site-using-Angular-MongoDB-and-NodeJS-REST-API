import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CateegoryService } from './../../services/cateegory.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent {
  constructor(private categoryService:CateegoryService,private router:Router,private cookiesService:CookieService){}
  categoryForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    icon:new FormControl('',[Validators.required])
  })
  get getname(){
    return this.categoryForm.controls["name"];
  }
  get geticon(){
    return this.categoryForm.controls["icon"];
  }
  addcategory(e:any){
    e.preventDefault();
    if(this.categoryForm.status=="VALID")
    {
      this.categoryService.addCategory(this.categoryForm.value,this.cookiesService.get('token')).subscribe((res:any)=>{
        this.router.navigate(['dashboard/categories']);
      })
    }
      console.log(this.categoryForm.value)
  }
  fileChoosen(event:any)
{
  console.log(event.target.files[0])
  const file=event.target.files[0];
  this.categoryForm.patchValue({icon:file});
  this.categoryForm.get('icon')!.updateValueAndValidity();
  
}
}
