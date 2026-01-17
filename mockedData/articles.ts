import { Article } from "@/app/types/article";

export function getMockArticles(): Article[] {
    const articles: Article[] = [
    {
      id: "1",
      title: "Comece a usar o Buddy",
      content: "Este artigo mostra como dar os primeiros passos com o Buddy...",
      category: "Dicas",
    },
    {
      id: "2",
      title: "A inspiração por trás do Buddy",
      content: "Este artigo explora a inspiração por trás do Buddy...",
      category: "Informativo",
    },
  ];
  return articles;
}

export function getCategories(): string[] {
    const articles = getMockArticles();
    const uniqueCategories = [...new Set(articles.map(article => article.category))];
    return uniqueCategories;
}