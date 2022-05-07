import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: String = `http://192.168.0.15:4002/users`;

  constructor(private httpClient: HttpClient) {
    console.log('UsersService constructor');
  }

  getUsersByQuery(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}`);
  }

  getUserByIndex(index: String = ''): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${index}`);
  }

  createUser(user: User): User {
    const newUser: User = {
      userName: user.userName,
      lastName: user.lastName,
      firstName: user.firstName,
      phoneNumber: user.phoneNumber,
      emailAddress: user.emailAddress,
      password: user.password,
    };
    return newUser;
  }

  cloneUser(user: User, changevalues: User): User {
    const cloneUser: User = {
      id: user.id,
      userName: changevalues.userName,
      lastName: changevalues.lastName,
      firstName: changevalues.firstName,
      phoneNumber: changevalues.phoneNumber,
      emailAddress: changevalues.emailAddress,
      password: changevalues.password,
    };
    return cloneUser;
  }

  addUser(user: User) {
    return this.httpClient.post(`${this.baseUrl}`, user);
  }

  updateUser(user: User) {
    const { id, ...bodyData } = user;
    return this.httpClient.put<User>(`${this.baseUrl}/${id}`, bodyData);
  }

  deleteUser(id: String = '') {
    console.log('service delete');    
    console.log(`${this.baseUrl}/${id}`);
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  searchUser(ELEMENT_DATA: User[], emailAddress: String = '') {
    return ELEMENT_DATA.find((o) => o.emailAddress === emailAddress)?.id;
  }

  searchUserIndex(ELEMENT_DATA: User[], emailAddress: String = '') {
    return ELEMENT_DATA.find((o) => o.emailAddress === emailAddress)?.id;
  }
}
