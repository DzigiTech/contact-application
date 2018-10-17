import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate } from '@angular/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [
    trigger('animate', [
      transition('*=>*', [
        style({opacity:0, transform: 'translateY(-100%)'}),
        animate('0.4s ease-in')
      ])
    ])
  ]
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
