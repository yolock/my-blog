export interface PostFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  published: boolean;
  featured?: boolean;
  coverImage?: string;
  coverAlt?: string;
  canonical?: string;
  series?: string;
  seriesOrder?: number;
}

export interface PostSummary {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
}

export interface Post extends PostSummary {
  content: string;
  headings: Heading[];
}

export interface Heading {
  level: 1 | 2 | 3;
  text: string;
  id: string;
}

export interface Tag {
  name: string;
  count: number;
}
