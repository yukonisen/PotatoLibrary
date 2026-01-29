import {getAllBooks} from "@/lib/db";
import Link from "next/link";
import {notFound} from "next/navigation";

export default async function CategoryDetailPage({ 
  params 
}: { 
  params: Promise<{ tag: string }> 
}) {
  const { tag: tagKey } = await params;
  const allBooks = await getAllBooks();

  const filteredBooks = allBooks.filter(book => 
    book.tags?.some((t: { key: string }) => t.key === tagKey)
  );

  const tagName = filteredBooks[0]?.tags?.find((t: any) => t.key === tagKey)?.name || tagKey;

  if (filteredBooks.length === 0) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <header className="flex items-end gap-4 border-b border-secondary/30 pb-6">
        <h1 className="text-3xl font-bold text-on-surface">
          分类：<span className="text-primary">{tagName}</span>
        </h1>
        <p className="text-secondary pb-1 text-sm">共 {filteredBooks.length} 部作品</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBooks.map((book) => (
          <Link 
            href={`/book/${book.id}`} 
            key={book.id}
            className="group flex gap-4 p-4 bg-surface border border-secondary/30 rounded-2xl hover:border-primary hover:shadow-lg transition-all"
          >
            <div className="w-20 h-28 shrink-0 overflow-hidden rounded-lg bg-surface">
              <img 
                src={book.cover} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                alt={book.title}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-on-surface group-hover:text-primary truncate mb-1">
                {book.title}
              </h2>
              <p className="text-sm text-secondary mb-2">{book.author}</p>
              <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                {book.intro}
              </p>
              <div className="mt-3 flex gap-2">
                <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded">
                  {book.isFinished ? '已完结' : '连载中'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/category" className="text-sm text-secondary hover:text-primary transition">
          返回全部分类
        </Link>
      </div>
    </div>
  );
}