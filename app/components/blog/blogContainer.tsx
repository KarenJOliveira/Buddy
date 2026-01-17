"use client";

import { Article } from "@/app/types/article";
import img1 from "@/app/assets/bubupuds3.jpeg";
import img2 from "@/app/assets/bubupuds4.jpeg";
import Image from "next/image";
import CategorySelector from "./categorySelector";
import { useState } from "react";
import ArticleCards from "./articleCards";

interface BlogContainerProps {
  articles: Article[];
}

export default function BlogContainer({ articles }: BlogContainerProps) {
  const [category, setCategory] = useState("All categories");
  function handleSetCategory(selectedCategory: string) {
    setCategory(selectedCategory);
  }

  function getCategories() {
    const uniqueCategories = [
      "All categories",
      ...new Set(articles?.map((article) => article.category)),
    ];
    return uniqueCategories;
  }
  const categories = getCategories();

  const palette = [
    "bg-blue-500",
    "bg-orange-500",
    "bg-purple-500",
    "bg-green-500",
  ];

  const categoryColorMap: Record<string, string> = {};
  categories.forEach((cat, i) => {
    categoryColorMap[cat] = palette[i % palette.length];
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans">
      <h1 className="text-4xl font-black mb-8">Blog</h1>

      {/* Featured Post (Hero) */}
      <section className="bg-gray-100 rounded-[2.5rem] p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-gray-900">
            This is a featured article - the most important piece of content
          </h2>
          <p className="text-gray-600 text-lg max-w-md">
            Very short description of what's actually being discussed in this
            article, maybe the first sentences to provide a preview.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
            Read now
          </button>
        </div>
        <div className="flex-1 w-full">
          <Image
            src={img2}
            alt="Featured"
            className="rounded-3xl w-full object-cover h-[300px] md:h-[400px]"
          />
        </div>
      </section>

      {/* Filters */}
      <CategorySelector
        categories={categories}
        categoryColorMap={categoryColorMap}
        selectedCategory={category}
        onSetCategory={handleSetCategory}
      />

      {/* Grid de Artigos */}

      <ArticleCards
        articles={articles}
        categoryColorMap={categoryColorMap}
        selectedCategory={category}
      />

      {/*Adicione mais conforme necessário... */}
    </div>
  );
}
