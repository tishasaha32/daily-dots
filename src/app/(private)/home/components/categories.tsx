type CategoriesProps = {
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    categories: Category[];
};

const Categories = ({ selectedCategory, setSelectedCategory, categories }: CategoriesProps) => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex gap-2 items-center w-full max-w-lg overflow-scroll py-4 px-2 scrollbar-hide">
                {categories?.map((category) => (
                    <div
                        key={category?.uuid}
                        className={`px-3 py-1 border border-border rounded-full bg-card font-bold cursor-pointer 
                            ${selectedCategory === category?.title ? "text-black bg-secondary" : "text-secondary"}`}
                        onClick={() => setSelectedCategory(category?.title)}
                    >
                        {category?.title.charAt(0).toUpperCase() + category?.title?.slice(1)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
