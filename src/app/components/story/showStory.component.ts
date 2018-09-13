import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Story} from '../../classes/story/story.class';

import {StoryService} from '../../services/story/story.service';
import {UserDataProvider} from '../../services/userDataProvider.service';

import {ProxyResponse} from '../../classes/response.class';

@Component({
  selector: 'showStory',
  templateUrl: './showStory.component.html',
  styleUrls: ['../../styles/styles.scss']
})
export class ShowStoryComponent {

  private story: Story;

  constructor(private userDataProvider: UserDataProvider, private storyService: StoryService, private activatedRouter: ActivatedRoute) {
    this.story = new Story;
    storyService.getStory(this.activatedRouter.snapshot.params['id']).then(res => this.handleGetStory(res));
  }

  private handleGetStory(res: ProxyResponse<Story>) {
    if (res) {
      this.story = res.getT();
    }
  }
}
