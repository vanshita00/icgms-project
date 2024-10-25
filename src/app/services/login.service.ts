import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://dev-api.icgms.sharajman.com/token';
  constructor(private http: HttpClient) {}
  login(user_type_id: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${user_type_id}`, data);
  }
}
