export interface NewPostData {
  id: string;
  userId: string;
  post: string;
  timestamp: string;
  commentsIdArr: string[];
}

export interface UserPost {
  id: string;
  userId: string;
  post: string;
  timestamp: string;
  commentsIdArr: string[];
}

export interface UserData {
  id: string;
  username: string;
  postsIdArr: string[];
  commentsIdArr: string[];
}

