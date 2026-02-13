import {getAllBooks} from "@/lib/db";
import BookCard from "@/components/book-card";

export default async function HotPage() {
  const allBooks = await getAllBooks();
  
  const hotList = allBooks
    .sort((a, b) => (b.hotScore || 0) - (a.hotScore || 0))
    .slice(0, 10);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">热门排行</h1>
        <span className="text-xs text-secondary bg-surface px-2 py-1 rounded">实时更新</span>
      </div>
      
      <div className="bg-surface border border-secondary/30 rounded-2xl shadow-sm overflow-hidden">
        {hotList.map((book, i) => (
          <BookCard
            key={book.id}
            book={book}
            href={`/book/${book.id}`}
            className="items-center p-5 hover:bg-primary/10 border-0 border-b border-secondary/30 last:border-0 shadow-none rounded-none"
            coverWrapperClassName="w-14 h-20"
            coverImageClassName="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform"
            titleClassName="font-bold text-on-surface truncate group-hover:text-primary mb-1"
            authorRowClassName="text-sm text-secondary mb-2 flex items-center gap-2"
            introClassName="text-xs text-secondary line-clamp-2 leading-relaxed mb-2"
            tagTextClassName="text-secondary text-[10px]"
            statusRowClassName="flex flex-wrap items-center gap-2 text-[10px]"
            statusTextClassName="px-1.5 py-0.5 rounded"
            leading={
              <div className={`text-2xl font-black italic w-10 ${
                i === 0 ? 'text-yellow-500' : 
                i === 1 ? 'text-secondary' : 
                i === 2 ? 'text-primary' : 'text-secondary'
              }`}>
                {String(i + 1).padStart(2, '0')}
              </div>
            }
            trailing={
              <div className="text-right ml-4">
                <div className="text-primary font-mono font-bold">{book.hotScore}</div>
                <div className="text-[9px] text-secondary uppercase tracking-tighter">Hotness</div>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
