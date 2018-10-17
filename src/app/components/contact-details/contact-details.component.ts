import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate } from '@angular/animations';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  animations: [
    trigger('animateDetail', [
      transition('*=>*', [
        style({opacity:0, transform: 'translateY(-100%)'}),
        animate('0.4s ease-in')
      ])
    ])
  ]
})
export class ContactDetailsComponent implements OnInit {

  contactId: number;
  contact: Object;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.contactId = params.id);
  }

  ngOnInit() {
    // Get contact by Id
    this.dataService.getContact(this.contactId).subscribe(data => this.contact = data);
  }

}
