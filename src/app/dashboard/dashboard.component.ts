import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: { mail: "", pass: ""} | undefined

  constructor(private router: Router) { }

  ngOnInit(): void {
    let user = localStorage.getItem("user")
    if (!user) {
      this.router.navigate(['login'])
    } else {
      this.user = JSON.parse(user)
    }
  }

  logOut() {
    localStorage.removeItem("user")
    this.router.navigate(['login'])
  }

}
