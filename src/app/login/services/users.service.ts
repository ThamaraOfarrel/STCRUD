import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: String = `http://192.168.0.15:4002/users`;

  constructor( private httpClient: HttpClient ) {
    console.log('UsersService constructor');
  }

  getUsersByQuery( query: String = '' ): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}`);
  }

  getUserByIndex( index: String = '' ): Observable<User> {
    console.log(typeof index); 
    console.log(`${this.baseUrl}/${index}`); 
    return this.httpClient.get<User>(`${this.baseUrl}/${index}`);
  }

  searchUser(ELEMENT_DATA: User[], emailAddress:String = ''){
    return (ELEMENT_DATA.find(o => o.emailAddress === emailAddress)?.id)  
  } 

  searchUserIndex(ELEMENT_DATA: User[], emailAddress:String = ''){
    return ELEMENT_DATA.find(o => o.emailAddress === emailAddress)?.id
  } 
}