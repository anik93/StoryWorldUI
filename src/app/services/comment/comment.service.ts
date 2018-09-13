import {Injectable} from '@angular/core';

import {ProxyService} from '../proxy.service';

import {Request} from '../../classes/request.class';
import {Story} from '../../classes/story/story.class';
import {CommentContent} from '../../classes/comment/commentContent.class';


@Injectable()
export class CommentService {
  constructor(private proxyService: ProxyService) {}

  getCommentsByUser(token: string) {
    return this.proxyService.get<CommentContent>('comment', token);
  }

  getComments(page: Number, sizePage: Number, storyId: Number) {
    return this.proxyService.get<CommentContent>('comment/' + storyId + '/' + page + '/' + sizePage, null);
  }

  save(token: String, story: Story, commentContent: CommentContent) {
    let request = new Request();
    request.setToken(token);
    request.setStory(story);
    request.setCommentContent(commentContent);

    return this.proxyService.post<CommentContent>('comment', request);
  }

  update(token: String, story: Story, commentContent: CommentContent) {
    let request = new Request();
    request.setToken(token);
    request.setStory(story);
    request.setCommentContent(commentContent);

    return this.proxyService.put<CommentContent>('comment', request);
  }

  delete(id: String, token: string) {
    return this.proxyService.delete<CommentContent>('comment/' + id, token);
  }

  like(token: String, commentContent: CommentContent) {
    let request = new Request();
    request.setToken(token);
    request.setCommentContent(commentContent);

    return this.proxyService.post<CommentContent>('comment/like', request);
  }

  dislike(token: String, commentContent: CommentContent) {
    let request = new Request();
    request.setToken(token);
    request.setCommentContent(commentContent);

    return this.proxyService.post<CommentContent>('comment/dislike', request);
  }

}
