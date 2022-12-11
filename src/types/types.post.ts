import type { User } from './types.user';

type Post = {
  id: number;
  title: string;
  author: User;
  img?: string;
  story: JSON;
  recipe?: Recipe;
  likes?: User[];
  authorId: number;
  recipeId: number;
  createdAt: Date;
  updatedAt: Date;
};

type Comment = {
  id: number;
  author: User;
  authorId: number;
  copy: JSON;
};

type Ingredient = {
  id: number;
  name: string;
  measurement: string;
  additional: JSON;
  recipe: Recipe;
  recipeId: number;
};

type Recipe = {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: JSON;
  post: Post;
  postId: number;
};
