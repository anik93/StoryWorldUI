import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Story} from '../../classes/story/story.class';
import {StoryType} from '../../classes/story/storyType.enum';
import {StoryService} from '../../services/story/story.service';

import {ProxyResponse} from '../../classes/response.class';
import {UserDataProvider} from '../../services/userDataProvider.service';

@Component({
  selector: 'addStory',
  templateUrl: './addStory.component.html',
  styleUrls: ['../../styles/styles.scss']
})

export class AddStoryComponent {

  private story: Story;
  private storyTypes: Array<StoryType>;
  private tips: Boolean;

  constructor(private userDataProvider: UserDataProvider, private router: Router, private addStoryService: StoryService) {
    if (!this.userDataProvider.isLoggedIn())
      this.router.navigate(['/login']);
    this.story = new Story();
    this.storyTypes = this.prepareTypes();
  }

  public add() {
    this.addStoryService.addStory(this.story, this.userDataProvider.getToken()).then(res => this.handleResponse(res));
  }

  private handleResponse(res: ProxyResponse<Story>) {
    if (res)
      this.story = new Story();
  }

  private prepareTypes(): Array<StoryType> {
    let storyTypes = new Array<StoryType>();

    storyTypes.push(StoryType.ADVENTURE);
    storyTypes.push(StoryType.COMEDY);
    storyTypes.push(StoryType.CRIME);
    storyTypes.push(StoryType.FANTASY);
    storyTypes.push(StoryType.HORROR);
    storyTypes.push(StoryType.ROMANCE);
    storyTypes.push(StoryType.SCIFI);

    return storyTypes;
  }

  private showTips() {
    this.tips = !this.tips;
  }

  private isShowTips(): Boolean {
    return this.tips;
  }
}
