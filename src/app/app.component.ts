import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Berivan Hafta 3 Ödev';

  isLoggedIn(): boolean {
    return localStorage.getItem("user") != undefined
  }
}
