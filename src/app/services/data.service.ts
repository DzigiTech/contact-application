import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '.././contact.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>('http://localhost:3000/contacts');
  }
  getContact(contactId: number){
    return this.http.get('http://localhost:3000/contacts/' + contactId);
  }
  addContact(id, name, surname, gender, phone?, age?, birthdate?, type?){
    const contact = {
      id: id,
      name: name,
      surname: surname,
      age: age,
      birthdate: birthdate,
      phone: phone,
      gender: gender,
      type: type
    };
    console.log(contact);
    return this.http.post('http://localhost:3000/newcontact', contact);
  }
  deleteContact(contactId){
    return this.http.delete('http://localhost:3000/contacts/' + contactId);
  }
  editContact(contactId, age, birthdate, gender, phone, type){
    return this.http.put('http://localhost:3000/contacts/' + contactId + '/edit', {contactId, age, birthdate, gender, phone, type});
  }

}
