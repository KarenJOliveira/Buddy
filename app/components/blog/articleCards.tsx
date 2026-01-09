import img1 from "@/app/assets/bubupuds3.jpeg";
import { Article } from "@/app/types/article";
import Image from "next/image";

interface PostProps {
  articles: Article[];
  categoryColorMap: Record<string, string>;
  selectedCategory?: string;
}

const ArticleCards = ({
  articles,
  categoryColorMap,
  selectedCategory,
}: PostProps) => {
  const getArticlesInCategory = () => {
    if (selectedCategory && selectedCategory !== "All categories") {
      return articles.filter(
        (article) => article.category === selectedCategory
      );
    }
    return articles;
  };
  const articlesInCategory = getArticlesInCategory();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {articlesInCategory.map((article, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110"
        >
          <Image
            src={img1}
            alt={article.title}
            className="h-48 w-full object-cover"
          />
          <div className="p-6 flex flex-col gap-3">
            <span
              className={`text-xs font-bold uppercase px-3 py-1 rounded-full w-fit ${
                categoryColorMap[article.category] ?? "bg-gray-300"
              } text-white`}
            >
              {article.category}
            </span>
            <h3 className="text-xl font-bold leading-tight text-gray-900">
              {article.title}
            </h3>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 underline decoration-1 underline-offset-4"
            >
              Read now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleCards;
