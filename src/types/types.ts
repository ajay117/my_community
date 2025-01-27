export interface PostData {
  id: string;
  userId: string;
  post: string;
  timestamp: string;
  commentsIdArr: string[];
}

export interface NewPostData {
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

export interface Comment {
  id: string;
  userId: string;
  comment: string;
  timestamp: string;
  replies: string[];
}

export interface NewComment {
  userId: string;
  comment: string;
  timestamp: string;
  replies: string[];
}
