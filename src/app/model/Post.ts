import { Topic } from './Topic';
import { User } from './User';

export class Post {
  public idpost: number;
  public title: string;
  public text: string;
  public image: string;
  public datepost: Date;
  public topic: Topic;
  public username: User;
}
