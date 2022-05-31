import { CATEGORIES, Category } from 'src/abbreviations'

const CategorySelect = ({
  category,
  setCategory,
}: {
  category: Category
  setCategory: React.Dispatch<React.SetStateAction<Category>>
}) => {
  return (
    <div className="flex justify-center flex-wrap mb-10">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          className={`m-1 md:m-2 py-1 px-3 font-medium rounded-full transition ${
            cat.key === category.key ? 'bg-yellow-600 text-white cursor-default' : 'hover:scale-110'
          }`}
          onClick={() => setCategory(cat)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default CategorySelect
