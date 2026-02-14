import {getAllBooks} from "@/lib/db";
import BookCard from "@/components/book-card";

export default async function AnnualBestPage() {
  const books = await getAllBooks();
  const annualBest = books.filter((book) => book.isAnnualBest);

  return (
    <div className="space-y-8">
      <header className="flex items-end gap-4 border-b border-secondary/30 pb-6">
        <h1 className="text-3xl font-bold text-on-surface">年度最佳作品</h1>
        <p className="text-secondary pb-1 text-sm">共 {annualBest.length} 部作品</p>
      </header>

      {annualBest.length === 0 ? (
        <div className="p-4 border border-secondary/30 rounded-lg text-sm text-secondary">暂无资料</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {annualBest.map((book) => (
            <BookCard key={book.id} book={book} href={`/book/${book.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
