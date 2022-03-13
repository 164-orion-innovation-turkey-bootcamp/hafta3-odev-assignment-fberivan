import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  /**
   * Login olmak için kullanılan servis fonksiyonu
   * @param mail Kullanıcı e-posta adresi
   * @param pass Kullanıcı şifresi
   */
  login(mail: string, pass: string): Observable<any>{
    return this.http.get(`${environment.API_URL}/users?mail=${mail}&pass=${pass}`)
  }

  /**
   * Kullanıcı kayıt etmek için kullanılan servis fonksiyonu
   * @param user Kayıt edilecek kullanıcı nesnesi
   */
  register(user: any): Observable<any>{
    return this.http.post(`${environment.API_URL}/users`, user)
  }
}
