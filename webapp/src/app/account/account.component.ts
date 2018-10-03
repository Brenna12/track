import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/toPromise';
// import { environment } from '../../environments/environment';
import { ProjectsService } from '../projects/projects.service';
import { EnvironmentService } from '../environment.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  // url = environment.resources.userApiUrl;

  user: any;

  tags: any;
  loading;

  constructor(
    private http: HttpClient,
    private projects: ProjectsService,
    private environment: EnvironmentService
  ) {

    this.loading = true;
   }

  ngOnInit() {

    // Get User details from user info api

    console.log(this.environment.config)
    this.getUserDetails().subscribe(user => {
      this.user == user;
      localStorage.setItem('User', JSON.stringify(this.user));

      this.projects.getTags().subscribe(tags => {

        this.tags = tags;


        this.loading = false;



      }, err => {
        // console.log(err);
        this.loading = false;
        
      });









      }, err => {
        console.log(err);
        this.loading = false;

      });
      // ...and then with that id, query database for scenarios
    }





  getUserDetails(): Observable<any> {


    return this.http.get(this.environment.config.resources.userApiUrl)
      .map(res => {
        console.log(res);

        this.user = res;

      })
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();

    console.log(body);
    this.user == body;

    return body || {};
  }

  private handleError(error: any) {

    
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
