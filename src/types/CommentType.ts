export interface Comment {
  id: string;
  userId: string;
  comment: string;
  timestamp: string;
  replies: Reply[];
}

export interface NewComment {
  userId: string;
  comment: string;
  timestamp: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}
