import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {User} from '../../classes/user/user.class';
import {Story} from '../../classes/story/story.class';
import {CommentContent} from '../../classes/comment/commentContent.class';
import {ProxyResponse} from '../../classes/response.class';

import {UserService} from '../../services/user/user.service';
import {CommentService} from '../../services/comment/comment.service';
import {StoryService} from '../../services/story/story.service';
import {UserDataProvider} from '../../services/userDataProvider.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../styles/styles.scss']
})
export class ProfileComponent implements OnInit {

  private id: number;
  private comments: Array<CommentContent> = [];
  private stories: Array<Story> = [];
  private user: User = new User();
  private accessUser: boolean = false;

  constructor(private commentService: CommentService, private storyService: StoryService, private userDataProvider: UserDataProvider,
    private router: ActivatedRoute, private userService: UserService, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.userService.get(this.id, this.userDataProvider.getToken()).then(res => this.handleUser(res));
  }

  private handleUser(res: ProxyResponse<User>) {
    if (res) {
      this.user = res.getT();
      if (this.userDataProvider.getUser().id === this.user.id)
        this.accessUser = true;
      if (this.user.id === this.userDataProvider.getUser().id) {
        this.storyService.getStoriesByUser(this.userDataProvider.getToken()).then(res => this.handleStries(res));
        this.commentService.getCommentsByUser(this.userDataProvider.getToken()).then(res => this.handleComments(res));
      } else {
        this.storyService.getStoriesByUser(String(this.user.id)).then(res => this.handleStries(res));
        this.commentService.getCommentsByUser(String(this.user.id)).then(res => this.handleComments(res));
      }
    }
  }

  private handleStries(res: ProxyResponse<Story>) {
    if (res)
      this.stories = res.getList();
  }

  private handleComments(res: ProxyResponse<CommentContent>) {
    if (res)
      this.comments = res.getList();
  }

}
