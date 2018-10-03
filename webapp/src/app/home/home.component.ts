import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

}
