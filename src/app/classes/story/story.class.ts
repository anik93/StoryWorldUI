import {StoryType} from './storyType.enum';
import {User} from '../user/user.class';

export class Story {

  id: Number;

  type: StoryType;

  name: String;

  description: String;

  date: any;

  createdDate: String;

  author: User;

  rawText: String;

  avgRate: number;

  keywords: any;

  pages: any;

  constructor() {
    this.author = new User;
  }

}
