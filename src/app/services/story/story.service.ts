import {Injectable} from '@angular/core';

import {ProxyService} from '../proxy.service';

import {Request} from '../../classes/request.class';
import {Story} from '../../classes/story/story.class';
import {Filter} from '../../classes/common/filter.class';

@Injectable()
export class StoryService {

  constructor(private proxyService: ProxyService) {}

  public getStoriesByUser(token: string) {
    return this.proxyService.get<Story>('story', token);
  }

  public addStory(story: Story, token: String) {
    let request = new Request();
    request.setToken(token);
    request.setStory(story);

    return this.proxyService.post<Story>('story/add', request);
  }

  public editStory(story: Story, token: String) {
    let request = new Request();
    request.setToken(token);
    request.setStory(story);

    return this.proxyService.put<Story>('story/add', request);
  }

  public getStory(id: Number) {
    return this.proxyService.get<Story>('story/' + id, null);
  }

  public getStories(page: number, size: Number, text: String, filters: Filter) {
    if (page > 0)
      --page;
    if (text)
      return this.proxyService.get<Story>('story/' + page + '/' + size + '/' + text, null);
    else
      return this.proxyService.get<Story>('story/' + page + '/' + size, null);
  }
}
