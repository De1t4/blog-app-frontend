export interface Posts {
  id: number;
  content: string;
  title: string;
  datePosts: string;
  name: string;
  idUser: number
  type: string
  picture?: string
  comments: Comment[]
}

export interface Comment {
  commentIndex?: number
  idUser: number
  name: string
  lastname: string
  dateComment: string
  email: string
  content: string
  idComment: number
}

export interface DataCard  {
  name: string
  loadComment?: () => void
  datePosts: string
  type: string
  id: number
  content: string
  title: string
  picture:string
  children
}

export interface StateModal {
  stateModal: boolean
  children?
  onClick?: () => void
}

export interface tokenUser{
  email: string
  idUser: number
  lastname: string
  name: string
  token: string
}



export interface UserLogin{
  email: string
  password: string
}

export type FormEvents = {
  change: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  submit: React.FormEvent<HTMLFormElement>;
};

export interface CommentUser{
  posts_id: number
  title: string
  id_comment: number
  comment: string
  date: string
}

export interface PostUser {
  id_posts: number
  title: string
  content: string
  date: string
}

export interface UserProfile {
  id: number
  name: string
  lastname: string
  email: string
  posts: PostUser[]
  comments: CommentUser[]
  follows: string
  followMe: string
}

export interface Post {
  idpost: number
  title: string
  content: string
  date: string
}

export interface Favorite {
  idPosts: number
  title: string
  content: string
  favorite: number
}
