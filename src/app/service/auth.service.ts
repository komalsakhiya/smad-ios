import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private httpReq: HTTP
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      localStorage.getItem('mobileno')
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Register User
   * @param {object} data
   */
  register(data) {
    let params = new HttpParams();
    Object.keys(data).forEach((key) => {
      params = params.set(key, data[key]);
    });
    return this.http.post('https://crm.smadmag.com/smad_serv_ios/index.php?' + params, {}, { headers: this.headers }).
      pipe(map((user: any) => {
        if (user) {
          // localStorage.setItem('',)
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }


  logOut() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('mobileno');
    this.router.navigate(['/auth/login']);
  }
}
