import { Post } from './Post';

export class User {
  public iduser: number;
  public name: string;
  public username: string;
  public password: string;
  public picture: string;
  public usertype: string;
  public posts: Post[];
}
