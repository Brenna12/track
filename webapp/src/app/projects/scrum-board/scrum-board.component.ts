import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { ProjectsService } from "../projects.service";
import { Results } from "../../issues.interface";
import { ActivatedRoute } from '@angular/router';
import { MatGridList } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-scrum-board',
  templateUrl: './scrum-board.component.1.html',
  styleUrls: ['./scrum-board.component.scss']
})
export class ScrumBoardComponent implements OnInit {

  todo: any = [];
  done: any = [];
  complete: any = [];
  progress: any = [];
  pbis: any = [];
  review: any = [];
  breakpoint;
  data: any;
  project: any;
  loading;




  constructor(private xml: ProjectsService, private route: ActivatedRoute) { }


  ngOnInit() {

    this.loading = true;


    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;

    this.project = this.route.snapshot.params['project'];

    this.xml.getDataByProject(this.project)
      .map(this.extractData)
      .subscribe((result: any) => {

        this.data = result;


        this.data.issues.forEach(element => {

          console.log(element.fields.status.name);

          if (element.fields.status.name === 'Done') {

            this.done.push(element);

          } else if (element.fields.status.name === 'To Do') {

            this.todo.push(element);

          } else if (element.fields.status.name === 'In Progress') {

            this.progress.push(element);

          } else if (element.fields.status.name === 'In Review') {

            this.review.push(element);


          } else if (element.fields.status.name === 'Completed') {

            this.complete.push(element);

          } else if (element.fields.status.name === 'PBIs in Sprint') {

            this.pbis.push(element);

          }

        });
        console.log(this.todo)
        console.log(this.done)


        this.done.forEach(element => {
          console.log(element)

          element.fields.issuetype.name === 'Story' ? this.pbis.push(element) : this.pbis.push();
        })

        this.loading = false;



      });
  }




  private extractData(res: Response) {
    let body = res;

    return body || {};
  }


  logObject() {
    console.log(this.data);
  }


  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }
}
