// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, map } from 'rxjs';
// import { UserStorageService } from '../stoarge/user-storage.service';

// const BASIC_URL = "http://localhost:8081/";
// const AUTH_HEADER = 'authorization';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor( private http: HttpClient,
//     private userStorageService: UserStorageService) { }

//   register(sigunupRequest:any):  Observable<any> {
//     return this.http.post(BASIC_URL+ "sign-up", sigunupRequest);
//   }

//   login(username: string, password: string): any {
//     const headers = new HttpHeaders().set('Content-Type', 'application/json');
//     const body = {username, password};

//     return this.http.post(BASIC_URL + 'authenticate', body, { headers, observe: 'response' }).pipe(
//       map((res) =>{
//         const token = res.headers.get('authorization')?.substring(7);
//         const user = res.body;
//         if(token && user){
//           this.userStorageService.saveToken(token);
//           this.userStorageService.saveUser(user);
//           return true;
//         }
//         return false;
//       })
//     )
//   }

//   getOrderByTrackingId(trackingId: number): Observable<any>{
//     return this.http.get(BASIC_URL + `order/${trackingId}`);
//   }
// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from '../stoarge/user-storage.service';
 
const BASIC_URL = "http://localhost:8080/";
const AUTH_HEADER = 'authorization';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) { }
 
  register(sigunupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "auth/signup", sigunupRequest);
  }
 
  login(username: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };
 
    return this.http.post(BASIC_URL + 'auth/login', body, { headers, observe: 'response' }).pipe(
      map((res) => {
        const token = res.headers.get('authorization')?.substring(7);
        const user = res.body;
        if (token && user) {
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;
      })
    )
  }
 
  getOrderByTrackingId(trackingId: number): Observable<any> {
    const obj = {
      trackingId: trackingId
    }
    return this.http.post(BASIC_URL + `order/tracking`, obj);
    // return this.http.get(BASIC_URL + `order/tracking`);
  }
}
 

