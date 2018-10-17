import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { trigger,style,transition,animate } from '@angular/animations';


@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css'],
  animations: [
    trigger('animateTable', [
      transition('*=>*', [
        style({opacity:0, transform: 'translateX(30%)'}),
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export class ContactlistComponent implements OnInit {

  public contacts: any;
  public searchText: string = "";
  public orderParam: string = 'id';
  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit() {
    this.dataService.getContacts().subscribe(res => this.contacts = res);
  }
  search(value){
    this.searchText = value;
  }
  orderList(param: string){
    this.orderParam = param;
  }
  view(contactId){
    this.route.navigateByUrl('contacts/'+ contactId);
  }
  edit(contactId){
    this.route.navigateByUrl('contacts/'+ contactId +'/edit');
  }
  delete(contactId){
    this.dataService.deleteContact(contactId).subscribe(res => this.contacts = res);
    alert("You have deleted the contact with id: " + contactId);
    location.reload(true);
  }

}
