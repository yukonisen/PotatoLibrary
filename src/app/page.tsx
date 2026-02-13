import {getAllBooks} from "@/lib/db";
import BookCard from "@/components/book-card";
import {formatUpdateDate} from "@/lib/format";
import Link from "next/link";

export default async function Home() {
  const books = await getAllBooks();
  
  const latest = [...books].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).slice(0, 5);
  const hot = [...books].sort((a, b) => b.hotScore - a.hotScore).slice(0, 10);
  const annualBest = books.filter(b => b.isAnnualBest);
  const potential = books.filter(b => !b.isFinished && b.hotScore < 5000).slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">年度最佳作品</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {annualBest.map(book => (
            <BookCard
              key={book.id}
              book={book}
              href={`/book/${book.id}`}
            />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-6">最近更新</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {latest.map(book => (
                <Link href={`/book/${book.id}`} key={book.id} className="group">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg bg-secondary/20">
                    <img src={book.cover} className="w-full h-full object-cover transition group-hover:scale-105" />
                  </div>
                  <h3 className="mt-2 font-bold text-sm truncate">{book.title}</h3>
                  <p className="text-xs text-secondary">{formatUpdateDate(book.lastUpdated)}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">潜力新书</h2>
            <div className="space-y-4">
              {potential.length === 0 ? (
                <div className="p-4 border border-secondary/30 rounded-lg text-sm text-secondary">
                  暂无资料
                </div>
              ) : (
                potential.map(book => (
                  <Link href={`/book/${book.id}`} key={book.id} className="block p-4 border border-secondary/30 rounded-lg hover:bg-surface">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{book.title}</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">连载中</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>

        <aside>
          <h2 className="text-2xl font-bold mb-6">热度总榜</h2>
          <div className="space-y-4">
            {hot.map((book, i) => (
              <Link href={`/book/${book.id}`} key={book.id} className="flex items-center gap-3 group">
                <span className={`text-lg font-mono w-6 ${i < 3 ? 'text-primary font-bold' : 'text-secondary'}`}>
                  {i + 1}
                </span>
                <span className="text-sm group-hover:text-primary truncate">{book.title}</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
