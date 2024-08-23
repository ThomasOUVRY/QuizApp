export type Categories = Category[];

export type Category = {
  id: number;
  name: string;
};

export type CategoryResponse = {
  trivia_categories: Category[];
};
