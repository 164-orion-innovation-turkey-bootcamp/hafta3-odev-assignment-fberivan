import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Giriş yapmış olan kullanıcının bilgilerinin tutulacağı değişken
  user: { mail: "", pass: ""} | undefined

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Giriş yapmış kullanıcı verisi varsa onu alıyoruz
    let user = localStorage.getItem("user")
    if (!user) {
      // Kullanıcı giriş yapmamış, login ekranına yönlendiriyoruz
      this.router.navigate(['login'])
    } else {
      // Kullanıcı nesnesini string'den object'e çeviriyoruz
      this.user = JSON.parse(user)
    }
  }

  logOut() {
    // Kullanıcı bilgilerini siliyoruz
    localStorage.removeItem("user")
    // Login ekranına yönlendiriyoruz
    this.router.navigate(['login'])
  }

}
