export type Category =
  | "Décennale"
  | "Assurance VTC"
  | "RC Pro"
  | "Assurance emprunteur"
  | "Habitation";

export type PostMeta = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: Category;
  date: string;
  readTime: string;
  image: {
    src: string;
    alt: string;
  };
};

export type Post = PostMeta & {
  Content: React.FC;
};
