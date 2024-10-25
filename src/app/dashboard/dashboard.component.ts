import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userData: any;  
  showProfile: boolean = false;  
  constructor(private router: Router, private http: HttpClient) {
    if (this.isBrowser()) {
      const token = localStorage.getItem('access_token');
      if (!token) {
        this.router.navigate(['/login']);
      }
    }
  }
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
  getUserProfile() {
    if (this.isBrowser()) {
      const token = localStorage.getItem('access_token');
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http.post('https://dev-api.icgms.sharajman.com/get-active-user-details', {}, { headers })
          .subscribe({
            next: (res) => {
              this.userData = res;  
              this.showProfile = true;  
            },
            error: (err) => {
              console.error('Error fetching user details', err);
            }
          });
      }
    }
  }
  logout() {
    if (this.isBrowser()) {
      const token = localStorage.getItem('access_token');
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http.post('https://dev-api.icgms.sharajman.com/logout', {}, { headers })
          .subscribe({
            next: (res) => {
              localStorage.removeItem('access_token');
              this.router.navigate(['/login']);
            },
            error: (err) => {
              console.error('Error during logout', err);
            }
          });
      }
    }
  }
}
