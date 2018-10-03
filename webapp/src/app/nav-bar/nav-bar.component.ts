import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication.service";
import { Observable } from 'rxjs';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {



}

}
