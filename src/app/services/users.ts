import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/entironment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserResponse } from '../interfaces/i-user-response';
import { IUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class Users {
  //private baseUrl='https://peticiones.online/api/users';
  private baseUrl=environment.apiUrl;
  httpClient=inject(HttpClient)
/*
  getAllUsers():Observable<IUserResponse>{
    return this.httpClient.get<IUserResponse>(this.baseUrl);
  }
*/
  getAllUsersPerPage(page:number=1):Observable<IUserResponse>{
    return this.httpClient.get<IUserResponse>(this.baseUrl+'?page='+page);
  }

   getUserById(id:string):Observable<IUser>{
    return this.httpClient.get<IUser>(this.baseUrl+'/'+id);
  }

  insertUser(body:IUser):Observable<any>{
    return this.httpClient.post(this.baseUrl,body, {});
  }

  deleteUser(id:string | undefined):Observable<any>{
    return this.httpClient.delete(this.baseUrl + '/' + id,{});
  }

  updateUser(id:number,body:IUser):Observable<any>{
    return this.httpClient.put(this.baseUrl + '/' + id,body,{})
  }
}
