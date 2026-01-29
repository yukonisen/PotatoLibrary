import {getAllBooks} from "@/lib/db";
import Link from "next/link";

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
          <Link 
            href={`/book/${book.id}`} 
            key={book.id} 
            className="flex items-center p-5 hover:bg-primary/10 border-b border-secondary/30 last:border-0 transition-colors group"
          >
            <div className={`text-2xl font-black italic w-10 mr-4 ${
              i === 0 ? 'text-yellow-500' : 
              i === 1 ? 'text-secondary' : 
              i === 2 ? 'text-primary' : 'text-secondary'
            }`}>
              {String(i + 1).padStart(2, '0')}
            </div>
            
            <img src={book.cover} className="w-14 h-20 object-cover rounded shadow-sm mr-4 group-hover:scale-105 transition-transform" />
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-on-surface truncate group-hover:text-primary">{book.title}</h3>
              <p className="text-sm text-secondary">{book.author} · {book.tags?.[0]?.name || '未分类'}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${book.isFinished ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                  {book.isFinished ? '已完结' : '连载'}
                </span>
              </div>
            </div>
            
            <div className="text-right ml-4">
              <div className="text-primary font-mono font-bold">{book.hotScore}</div>
              <div className="text-[9px] text-secondary uppercase tracking-tighter">Hotness</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}