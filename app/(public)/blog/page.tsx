import BlogContainer from "@/app/components/blog/blogContainer";
import { getMockArticles } from "@/mockedData/articles";

const BlogPage = () => {
  const articles = getMockArticles();

  return (
    <div>
      <h1>Welcome to the Public Blog Page!</h1>
      <BlogContainer articles={articles} />
    </div>
  );
};

export default BlogPage;
