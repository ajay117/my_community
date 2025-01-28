export interface UserData {
  id: string;
  username: string;
  password?: string;
  postsIdArr: string[];
  commentsIdArr: string[];
}

export interface NewUser {
  username: string;
  postsIdArr: string[];
  commentsIdArr: string[];
}
