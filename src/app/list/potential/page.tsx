import {getAllBooks} from "@/lib/db";
import BookCard from "@/components/book-card";

export default async function PotentialPage() {
  const books = await getAllBooks();
  const potential = books
    .filter((book) => !book.isFinished && (book.hotScore || 0) < 5000)
    .sort((a, b) => (b.hotScore || 0) - (a.hotScore || 0));

  return (
    <div className="space-y-8">
      <header className="flex items-end gap-4 border-b border-secondary/30 pb-6">
        <h1 className="text-3xl font-bold text-on-surface">潜力新书</h1>
        <p className="text-secondary pb-1 text-sm">共 {potential.length} 部作品</p>
      </header>

      {potential.length === 0 ? (
        <div className="p-4 border border-secondary/30 rounded-lg text-sm text-secondary">暂无资料</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {potential.map((book) => (
            <BookCard key={book.id} book={book} href={`/book/${book.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
