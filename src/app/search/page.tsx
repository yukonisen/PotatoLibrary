import {getAllBooks} from "@/lib/db";
import Link from "next/link";

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string, type?: string }> 
}) {
  const { q, type } = await searchParams;
  const query = q?.toLowerCase() || "";
  const searchType = type === "author" ? "author" : "title";

  const allBooks = await getAllBooks();

  const results = allBooks.filter(book => {
    if (searchType === "author") {
      return book.author.toLowerCase().includes(query);
    }
    return book.title.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-secondary/30 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">
            搜索结果
          </h1>
          <p className="text-sm text-secondary mt-1">
            正在以 <span className="text-primary font-medium">
              {searchType === "author" ? "作者" : "书名"}
            </span> 模式匹配关键词: "{query}"
          </p>
        </div>
        <div className="text-sm text-secondary bg-surface px-3 py-1 rounded-lg border border-secondary/30">
          共找到 {results.length} 部作品
        </div>
      </header>

      {results.length > 0 ? (
        <div className="grid gap-6">
          {results.map(book => (
            <Link 
              href={`/book/${book.id}`} 
              key={book.id} 
              className="flex gap-5 p-5 bg-surface border border-secondary/30 rounded-2xl hover:border-primary hover:shadow-lg transition-all group"
            >
              <div className="relative w-24 h-32 flex-shrink-0">
                <img 
                  src={book.cover} 
                  className="w-full h-full object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform" 
                  alt={book.title} 
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h2 className="text-lg font-bold text-on-surface group-hover:text-primary truncate mb-1">
                  {book.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-secondary mb-3">
                  <span className={searchType === "author" ? "bg-primary/10 text-primary px-1.5 rounded" : ""}>
                    {book.author}
                  </span>
                  <span>|</span>
                  <span>{book.tags?.[0]?.name}</span>
                  <span>|</span>
                  <span className={book.isFinished ? "text-green-600" : "text-blue-600"}>
                    {book.isFinished ? "已完结" : "连载中"}
                  </span>
                </div>
                <p className="text-sm text-secondary line-clamp-2 leading-relaxed">
                  {book.intro}
                </p>
              </div>

              <div className="hidden md:flex items-center text-secondary group-hover:text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center">
          <div className="text-6xl mb-6 grayscale opacity-20">🔎</div>
          <h3 className="text-on-surface font-bold text-lg">没搜到</h3>
          <p className="text-secondary mt-2">要不换个关键词？</p>
          <Link href="/" className="mt-8 inline-block text-primary font-medium hover:underline">
            回到首页
          </Link>
        </div>
      )}
    </div>
  );
}