import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/entironment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserResponse } from '../interfaces/i-user-response';

@Injectable({
  providedIn: 'root',
})
export class Users {
  //private baseUrl='https://peticiones.online/api/users';
  private baseUrl=environment.apiUrl;
  httpClient=inject(HttpClient)

  getAllUsers():Observable<IUserResponse>{
    return this.httpClient.get<IUserResponse>(this.baseUrl);
  }
}
