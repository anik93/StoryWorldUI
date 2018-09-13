import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {TranslationModule} from '../translate.module';

import {StoryListComponent} from './storyList.component';
import {AddStoryComponent} from './addStory.component';
import {ShowStoryComponent} from './showStory.component';
import {EditStoryComponent} from './editStory.component';
import {StoryService} from '../../services/story/story.service';
import {CommentComponent} from '../comment/comment.component';
import {CommentService} from '../../services/comment/comment.service';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {RatingModule} from 'ngx-rating';
import {NgxPaginationModule} from 'ngx-pagination';

const storyRoutes: Routes = [
  {
    path: 'story',
    children: [
      {
        path: '',
        component: StoryListComponent
      },
      {
        path: 'add',
        component: AddStoryComponent
      },
      {
        path: ':id',
        component: ShowStoryComponent
      },
      {
        path: 'edit/:id',
        component: EditStoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(storyRoutes), TranslationModule, FormsModule,
    MultiselectDropdownModule, RatingModule, NgxPaginationModule
  ],
  declarations: [
    StoryListComponent, AddStoryComponent, ShowStoryComponent, EditStoryComponent, CommentComponent
  ],
  exports: [
    StoryListComponent, AddStoryComponent, ShowStoryComponent, EditStoryComponent, CommentComponent
  ],
  providers: [StoryService, CommentService]
})
export class StoryModule {}
