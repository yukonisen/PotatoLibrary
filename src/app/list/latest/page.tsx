import {getAllBooks} from "@/lib/db";
import BookCard from "@/components/book-card";

export default async function LatestPage() {
  const books = await getAllBooks();
  const latest = [...books].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

  return (
    <div className="space-y-8">
      <header className="flex items-end gap-4 border-b border-secondary/30 pb-6">
        <h1 className="text-3xl font-bold text-on-surface">最近更新</h1>
        <p className="text-secondary pb-1 text-sm">共 {latest.length} 部作品</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {latest.map((book) => (
          <BookCard key={book.id} book={book} href={`/book/${book.id}`} />
        ))}
      </div>
    </div>
  );
}
