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
