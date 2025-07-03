export type User = {
  id: Number;
  username: String;
  password: String;
  discordUrl: String;
  posts: Post[];
  viewedPosts: Post[];
  createdAt: Date;
};

export type Post = {
  id: Number;
  authorId: Number;
  author: User;
  title: String;
  description: String;
  viewedUsers: User[];
  createdAt: Date;
};
