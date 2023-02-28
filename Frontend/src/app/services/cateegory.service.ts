import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CateegoryService {

  ARIUrl:string="http://localhost:8080/categories"
  constructor(public http:HttpClient) {
  }
  getAllCategories()
  {
    return this.http.get(this.ARIUrl)
  }
  getCategoryById(id:any,token:any){
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`})
    return this.http.get(`${this.ARIUrl}/${id}`,{ headers })
  }
  addCategory(body: any,token:any) {
    const categoryData=new FormData();
    categoryData.append('name',body.name)
    categoryData.append('icon',body.icon)
    
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`})
    return this.http.post(this.ARIUrl, categoryData, { headers })
  }
  updateCategory(body: any,token:any) {
    const categoryData=new FormData();
    categoryData.append('id',body.id)
    categoryData.append('name',body.name)
    categoryData.append('icon',body.icon)

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`})
    return this.http.patch(this.ARIUrl, categoryData, {headers})
  }
  deleteCategory(id: any,token: any) {
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`})
    return this.http.delete(`${this.ARIUrl}/${id}`, {headers});
  }
}
