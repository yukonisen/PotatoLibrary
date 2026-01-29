import {getAllBooks} from "@/lib/db";
import Link from "next/link";

export default async function CategoryPage() {
  const allBooks = await getAllBooks();

  const tagMap = new Map();
  
  allBooks.forEach(book => {
    book.tags?.forEach((tag: { key: string; name: string }) => {
      if (!tagMap.has(tag.key)) {
        tagMap.set(tag.key, tag.name);
      }
    });
  });

  const uniqueTags = Array.from(tagMap.entries()).map(([key, name]) => ({
    key,
    name,
  })).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-on-surface">全部分类</h1>
        <p className="text-secondary mt-2">按兴趣探索土豆文库的内容</p>
      </header>

      {uniqueTags.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {uniqueTags.map((tag) => (
            <Link
              key={tag.key}
              href={`/category/${tag.key}`}
              className="flex items-center justify-center p-6 bg-surface border border-secondary/30 rounded-2xl shadow-sm hover:border-primary hover:text-primary hover:shadow-md transition-all group text-center"
            >
              <div>
                <span className="block text-2xl mb-1 group-hover:scale-110 transition-transform">
                  📁
                </span>
                <span className="font-medium text-sm">{tag.name}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface rounded-3xl border border-dashed">
          <p className="text-secondary text-sm">暂无任何分类标签</p>
        </div>
      )}
    </div>
  );
}