import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  API:string = "https://customerdemoapi.herokuapp.com/api/customer/";
  TEMP_API:string = "https://jsonplaceholder.typicode.com/users";
  
  getUsers() {
    return this.http.get(this.TEMP_API);
  }

  setUser(user:any) {
    return this.http.post(this.TEMP_API, user);
  }

}
