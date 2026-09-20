import { Post } from "../entities/post.js";

export interface PostRepository {
  create(post: Post): Post;
  findAll(): Post[];
  findById(id: string): Post | undefined
  update(id: string, title: string, content: string): Post | undefined;
  patch(id: string,title?: string,content?: string): Post | undefined;
  delete(id:string): boolean
}