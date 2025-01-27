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
