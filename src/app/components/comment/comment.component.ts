import {Component, Input, OnInit} from '@angular/core';

import {Story} from '../../classes/story/story.class';
import {CommentContent} from '../../classes/comment/commentContent.class';
import {ProxyResponse} from '../../classes/response.class';

import {CommentService} from '../../services/comment/comment.service';
import {UserDataProvider} from '../../services/userDataProvider.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['../../styles/styles.scss']
})

export class CommentComponent implements OnInit {

  private story: Story = new Story();
  private addCommentContent: CommentContent = new CommentContent();
  private comments: Array<CommentContent> = [];
  private pageNumber: number = 0;
  private add: boolean = true;
  @Input() id: Number;

  constructor(private userDataProvider: UserDataProvider, private commentService: CommentService) {
  }

  ngOnInit() {
    this.story.id = this.id;
    this.commentService.getComments(this.pageNumber, 10, this.story.id).then(res => this.handleComments(res));
  }

  loadMore() {
    this.commentService.getComments(this.pageNumber, 10, this.story.id).then(res => this.handleComments(res));
  }

  addComment() {
    if (this.add) {
      this.commentService.save(this.userDataProvider.getToken(), this.story, this.addCommentContent).
        then(res => this.handleAddComment(res));
    } else {
      this.commentService.update(this.userDataProvider.getToken(), this.story, this.addCommentContent).
        then(res => this.handleAddComment(res));
    }
  }

  prepareEditComment(comment: CommentContent) {
    this.addCommentContent = comment;
    this.add = false;
  }

  deleteComment(comment: CommentContent) {
    this.commentService.delete(comment.id, this.userDataProvider.getToken()).then(res => this.handleDeleteComment(res, comment));
  }

  like(comment: CommentContent) {
    if (this.userDataProvider.isLoggedIn()) {
      this.commentService.like(this.userDataProvider.getToken(), comment).then(res => this.handleLike(res, comment));
    }
  }

  dislike(comment: CommentContent) {
    if (this.userDataProvider.isLoggedIn()) {
      this.commentService.dislike(this.userDataProvider.getToken(), comment).then(res => this.handleDislike(res, comment));
    }
  }

  checkAccessToComment(comment: CommentContent) {
    if (this.userDataProvider.isLoggedIn()) {
      if (comment.authorName === this.userDataProvider.getUser().name || this.userDataProvider.hasRole(2)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private handleComments(res: ProxyResponse<CommentContent>) {
    if (res) {
      if (this.comments.length === 0) {
        res.getList().forEach(x => this.comments.push(x));
        if (this.comments.length % 10 === 0 && this.comments.length !== 0) {
          this.pageNumber++;
        }
      } else if (res.getList().length > (this.comments.length % 10)) {
        for (let i = this.comments.length % 10; i < res.getList().length; i++) {
          this.comments.push(res.getList()[i]);
        }
      }
    }
  }

  private handleLike(res: ProxyResponse<CommentContent>, comment: CommentContent) {
    if (res) {
      comment.likes = res.getT().likes;
      comment.dislikes = res.getT().dislikes;
    }
  }

  private handleDislike(res: ProxyResponse<CommentContent>, comment: CommentContent) {
    if (res) {
      comment.likes = res.getT().likes;
      comment.dislikes = res.getT().dislikes;
    }
  }

  private handleAddComment(res: ProxyResponse<CommentContent>) {
    if (res) {
      this.removeOldComment(this.addCommentContent);
      this.addCommentContent = new CommentContent();
      this.comments.unshift(res.getT());
    } else {
      this.addCommentContent = new CommentContent();
      this.add = true;
    }
  }

  private handleDeleteComment(res: ProxyResponse<CommentContent>, comment: CommentContent) {
    if (res) {
      this.addCommentContent = new CommentContent();
      this.removeOldComment(comment);
      this.add = true;
    }
  }

  private removeOldComment(comment: CommentContent) {
    for (let entry of this.comments) {
      if (entry.id === comment.id) {
        let index = this.comments.indexOf(entry, 0);
        this.comments.splice(index, 1);
        break;
      }
    }
  }

}
