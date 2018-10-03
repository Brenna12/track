import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrumBoardComponent } from './scrum-board/scrum-board.component';
import { SlickModule } from 'ngx-slick';
import { MatGridListModule, MatTooltipModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    SlickModule.forRoot(),
    MatGridListModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  declarations: [ ScrumBoardComponent],
  exports: [
  ]
})
export class ProjectsModule { }
