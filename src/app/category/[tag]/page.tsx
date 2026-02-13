import {getAllBooks} from "@/lib/db";
import BookCard from "@/components/book-card";
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
          <BookCard
            key={book.id}
            book={book}
            href={`/book/${book.id}`}
          />
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
