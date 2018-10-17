import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute }  from "@angular/router";
import { DataService } from '../../services/data.service';
import { trigger,style,transition,animate } from '@angular/animations';

@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.css'],
  animations: [
    trigger('animateCard', [
      transition('*=>*', [
        style({opacity:0, transform: 'translateY(-100%)'}),
        animate('0.4s ease-in')
      ])
    ])
  ]
})
export class ContactManagementComponent implements OnInit {

  public contactForm: any;
  private contact: any;
  private contacts: any[];
  private contactId: number;
  public ageCheck: boolean = false;
  public isDisabled: boolean = true;
  public submitDone: boolean = false;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.route.params.subscribe( params => this.contact = params.id)
  }

  ngOnInit() {
    // Get contacts
    this.dataService.getContacts().subscribe(res => this.contacts = res);
    this.contactForm = this.fb.group({
      id: [],
      name: new FormControl({disabled:false, value:''}, Validators.required),
      surname: new FormControl({disabled:false, value:''}, Validators.required),
      age: [],
      birthdate: new FormControl('', [Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$'), Validators.maxLength(10)]),
      phone: new FormControl('',Validators.pattern('^([06]{1}[0-9]{8-9})$')),
      gender: new FormControl('male'),
      type: []
    })
    // If edit, patch values
    if (this.route.snapshot.routeConfig.path !== "newcontact") {
      this.isDisabled = false;
      this.contactId = this.route.snapshot.params['id'];
      this.contactForm.get('name').disable();
      this.contactForm.get('surname').disable();
      this.dataService.getContact(this.contactId).subscribe(data =>{
        this.contact = data;
        this.contactForm.patchValue(this.contact);

      })
    }
  }
  contactAgeCheck(){
    let currentYear = 2018;
    let age = this.contactForm.get('age').value;
    let birthdate = this.contactForm.get('birthdate').value;
    let birthyear = birthdate.substr(birthdate.length-4);
    if (age==null || birthdate==null) {
      return true;
    } else if ((currentYear - birthyear) == age) {
      return true;
    } else {
      return false;
    }
  }
  onSubmit(name, surname, gender, phone, age, birthdate, type){
    if (this.contactForm.valid && this.contactAgeCheck() == true) {
      // If creating new, create id and pass values
      if (this.route.snapshot.routeConfig.path == "newcontact") {
        this.contactForm.value.id = this.contacts[(this.contacts.length-1)].id + 1;
        console.log(this.contactForm);
        this.dataService.addContact(this.contactForm.value.id, name, surname, this.contactForm.value.gender, phone, age, birthdate, this.contactForm.value.type).subscribe(data => this.contact = data);
        alert("The contact has been added");
        this.contactForm.reset;
      // If editing, pass modified values
      } else {
        this.contactForm.value.id = this.route.snapshot.params['id'];
        this.dataService.editContact(this.contactForm.value.id, age, birthdate, gender, phone, type).subscribe(data => this.contact = data);
        alert("The contact has been modified");
      }
    } else {
      console.log("Form is not valid!")
    }
    this.submitDone = true;

  }

}
