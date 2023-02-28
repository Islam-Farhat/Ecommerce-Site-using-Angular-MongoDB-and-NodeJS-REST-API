import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent {
@Input() childcategories:any;

@Output() myEventID=new EventEmitter();
SendID(categoryid:any)
{
  this.myEventID.emit(categoryid);
}
}
