import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Results } from "../issues.interface";
import { environment } from '../../environments/environment';
// import { EnvironmentService } from '../environment.service';

@Injectable()
export class ProjectsService implements OnInit {

  constructor(private http: HttpClient,
    // private environment: EnvironmentService
  ) { }


  url = 'https://projects.gen4.info/sr/jira.issueviews:searchrequest-rss/temp/SearchRequest.xml?jqlQuery=';
  params = '"Client(s)"%20in%20(QMRS)';
  parser = new DOMParser();


  ngOnInit() {

  }

  getXMLData() {

    return this.http.get<any>(this.url, {
      params: {
        jql: this.params
      }
    });
  }

  getTestData() {

    let user = JSON.parse(localStorage.getItem('User'));

    return this.http.get(environment.resources.projects.client, {
      params: {
        client: user.c_id
      }
    });

  }


  getDataByProject(project: any) {


    return this.http.get(environment.resources.projects.project, {
      params: {
        project: project
      }
    });

  }

  getTags() {

    let user = JSON.parse(localStorage.getItem('User'));

    return this.http.get(environment.resources.projects.tags, {
      params: {
        client: user.c_id,
        user: user.user_id
      }
    });

  }
}
