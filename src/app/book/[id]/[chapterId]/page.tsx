import {getBookById} from "@/lib/db";
import Link from "next/link";
import {notFound} from "next/navigation";

type Chapter = {
  id: string;
  title: string;
  content: string;
};

type Volume = {
  chapters?: Chapter[];
};

export default async function ReaderPage({ params }: { params: Promise<{ id: string, chapterId: string }> }) {
  const { id, chapterId } = await params;
  const book = await getBookById(id);
  const chapters: Chapter[] = (book?.volumes ?? []).flatMap((v: Volume) => v.chapters ?? []);
  const chapterIndex = chapters.findIndex(c => c.id === chapterId);
  const chapter = chapterIndex >= 0 ? chapters[chapterIndex] : null;
  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex >= 0 && chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;

  if (!chapter) notFound();

  const renderContent = (content: string) => {
    const parts = content.split(/(\[image\]\(.*?\))/g);
    
    return parts.map((part, index) => {
      const imageMatch = part.match(/\[image\]\((.*?)\)/);
      if (imageMatch) {
        const imageUrl = imageMatch[1];
        return (
          <span key={index} className="block my-8">
            <img src={imageUrl} className="mx-auto max-w-full h-auto border border-secondary/30"/>
          </span>
        );
      }
      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <nav className="mb-12 text-sm text-secondary flex gap-2 items-center">
          <Link href="/" className="hover:text-primary transition">首页</Link>
          <span>/</span>
          <Link href={`/book/${id}`} className="hover:text-primary transition truncate max-w-[150px]">
            {book?.title}
          </Link>
          <span>/</span>
          <span className="text-secondary truncate">{chapter.title}</span>
        </nav>
        
        <header className="mb-12 border-b border-secondary/30 pb-8 text-center">
          <h1 className="text-3xl font-bold text-on-surface leading-tight">
            {chapter.title}
          </h1>
          <p className="mt-4 text-sm text-secondary italic">
            {book?.author} · 土豆文库
          </p>
        </header>

        <article className="text-xl text-on-surface leading-loose font-serif">
          {renderContent(chapter.content)}
        </article>

        <footer className="mt-20 pt-10 border-t border-secondary/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={prevChapter ? `/book/${id}/${prevChapter.id}` : "#"}
              aria-disabled={!prevChapter}
              className={`px-6 py-2 border rounded-full transition font-medium ${
                prevChapter
                  ? "border-primary text-primary hover:bg-primary/10"
                  : "border-secondary/30 text-secondary cursor-not-allowed"
              }`}
            >
              上一章
            </Link>
            <Link 
              href={`/book/${id}`} 
              className="px-8 py-2 border border-primary text-primary rounded-full hover:bg-primary/10 transition font-medium"
            >
              返回目录
            </Link>
            <Link
              href={nextChapter ? `/book/${id}/${nextChapter.id}` : "#"}
              aria-disabled={!nextChapter}
              className={`px-6 py-2 border rounded-full transition font-medium ${
                nextChapter
                  ? "border-primary text-primary hover:bg-primary/10"
                  : "border-secondary/30 text-secondary cursor-not-allowed"
              }`}
            >
              下一章
            </Link>
          </div>
          <p className="text-center text-xs text-secondary mt-12 uppercase tracking-widest">
            End of Chapter
          </p>
        </footer>
      </div>
    </div>
  );
}
