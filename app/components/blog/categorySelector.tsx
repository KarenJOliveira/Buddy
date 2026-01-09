interface CategorySelectorProps {
  categories: string[];
  categoryColorMap: Record<string, string>;
  selectedCategory: string;
  onSetCategory: (category: string) => void;
}

const CategorySelector = ({
  categories,
  categoryColorMap,
  selectedCategory,
  onSetCategory,
}: CategorySelectorProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {categories.map((cat) => {
        const colorClass = categoryColorMap[cat];
        return (
          <button
            key={cat}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-colors ${colorClass} text-white ${
              selectedCategory === cat
                ? "border-2 border-black"
                : `hover:opacity-80 hover:bg-gray-100 hover:shadow-md hover:text-black`
            }`}
            onClick={() => onSetCategory(cat)}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default CategorySelector;
