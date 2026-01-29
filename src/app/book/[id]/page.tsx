import {getBookById} from "@/lib/db";
import Link from "next/link";
import {notFound} from "next/navigation";

type Chapter = {
  id: string;
  title: string;
  content: string;
};

type Volume = {
  name: string;
  chapters: Chapter[];
};

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) notFound();

  const formatWordCount = (count: number) => {
    if (count >= 10000) return `${(count / 10000).toFixed(1)} 万字`;
    return `${count} 字`;
  };

  const formatUpdateDate = (date: Date | string) => {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "未知";
    return parsed.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 mb-12">
        <div className="w-56 shrink-0 mx-auto md:mx-0">
          <img src={book.cover} alt={book.title} className="w-full rounded-xl shadow-2xl border border-secondary/30" />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-on-surface mb-2">{book.title}</h1>
          <p className="text-secondary text-lg mb-6 font-medium">{book.subtitle}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm py-6 border-y border-secondary/30 mb-6">
            <div>
              <p className="text-secondary mb-1">作者</p>
              <p className="font-bold text-on-surface">{book.author}</p>
            </div>
            <div>
              <p className="text-secondary mb-1">更新日期</p>
              <p className="font-bold text-on-surface">{formatUpdateDate(book.lastUpdated)}</p>
            </div>
            <div>
              <p className="text-secondary mb-1">字数</p>
              <p className="font-bold text-on-surface">{formatWordCount(book.wordCount)}</p>
            </div>
            <div>
              <p className="text-secondary mb-1">状态</p>
              <p className={`font-bold ${book.isFinished ? 'text-green-600' : 'text-primary'}`}>
                {book.isFinished ? '已完结' : '连载中'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {book.tags.map((tag: any) => (
              <Link key={tag.key} href={`/category/${tag.key}`} className="px-3 py-1 bg-surface text-secondary rounded-full text-xs hover:bg-primary/20 hover:text-primary transition">
                #{tag.name}
              </Link>
            ))}
          </div>

          <p className="text-on-surface leading-relaxed text-sm bg-surface p-5 rounded-2xl">
            {book.intro}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-xl font-bold border-b-2 border-primary pb-2 w-fit">正文目录</h2>
        {book.volumes.map((vol: Volume, vIdx: number) => (
          <div key={vIdx} className="space-y-4">
            <h3 className="font-bold text-secondary text-sm uppercase tracking-wider">{vol.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {vol.chapters.map((ch: Chapter) => (
                <Link 
                  href={`/book/${book.id}/${ch.id}`} 
                  key={ch.id}
                  className="p-3 bg-surface border border-secondary/30 rounded hover:border-primary hover:text-primary transition"
                >
                  {ch.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
