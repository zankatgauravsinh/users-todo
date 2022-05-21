import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  // API:string = "https://customerdemoapi.herokuapp.com/api/customer/";
  API:string = "https://jsonplaceholder.typicode.com/users";
  // API:string = "http://localhost:3000/user"

  getUsers() {
    return this.http.get(this.API);
  }

  setUser(user:any) {
    return this.http.post(this.API, user);
  }

}
