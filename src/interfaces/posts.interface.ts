export interface IPost {
  _id: string;
  title: string;
  body: string;
  _userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IPostDto = Pick<IPost, "title" | "body">;
