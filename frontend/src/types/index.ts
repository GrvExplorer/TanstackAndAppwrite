export type BlogType = {
  _id: string;
  title: string;
  content: string;
};

export type BlogTypeCreate = {
  title: string;
  content: string;
}