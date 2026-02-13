import {formatUpdateDate, formatWordCount} from "@/lib/format";
import Link from "next/link";
import type {ReactNode} from "react";

type BookTag = {
  key: string;
  name: string;
};

type BookLike = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  publisher?: string;
  intro?: string;
  cover: string;
  tags?: BookTag[];
  isFinished?: boolean;
  wordCount?: number;
  lastUpdated: Date | string;
};

type BookCardProps = {
  book: BookLike;
  href: string;
  className?: string;
  coverWrapperClassName?: string;
  coverImageClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  authorRowClassName?: string;
  introClassName?: string;
  tagsClassName?: string;
  tagTextClassName?: string;
  statusRowClassName?: string;
  statusTextClassName?: string;
  highlightAuthor?: boolean;
  showChevron?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export default function BookCard({
  book,
  href,
  className = "",
  coverWrapperClassName = "w-20 h-28",
  coverImageClassName = "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500",
  contentClassName = "flex-1 min-w-0",
  titleClassName = "font-bold text-on-surface group-hover:text-primary truncate mb-1",
  authorRowClassName = "text-sm text-secondary mb-2 flex items-center gap-2",
  introClassName = "text-xs text-secondary line-clamp-2 leading-relaxed mb-2",
  tagsClassName = "flex flex-wrap items-center gap-1.5 mb-2",
  tagTextClassName = "text-secondary text-[10px]",
  statusRowClassName = "flex flex-wrap items-center gap-2 text-[10px]",
  statusTextClassName = "px-2 py-0.5 rounded",
  highlightAuthor = false,
  showChevron = false,
  leading,
  trailing,
}: BookCardProps) {
  const tags = book.tags?.length ? book.tags : [{ key: "uncategorized", name: "未分类" }];

  return (
    <Link
      href={href}
      className={`group flex gap-4 p-4 bg-surface border border-secondary/30 rounded-2xl hover:border-primary hover:shadow-lg transition-all ${className}`}
    >
      {leading}

      <div className={`${coverWrapperClassName} shrink-0 overflow-hidden rounded-lg bg-surface`}>
        <img src={book.cover} className={coverImageClassName} alt={book.title} />
      </div>

      <div className={contentClassName}>
        <h3 className={titleClassName}>
          {book.title}
          {book.subtitle ? <span className="text-secondary font-medium"> · {book.subtitle}</span> : null}
        </h3>
        <p className={authorRowClassName}>
          <span className={highlightAuthor ? "bg-primary/10 text-primary px-1.5 rounded" : ""}>{book.author}</span>
          <span>·</span>
          <span>{book.publisher || "未知"}</span>
        </p>
        <p className={introClassName}>{book.intro}</p>
        <div className={tagsClassName}>
          {tags.map((tag) => (
            <span key={tag.key} className={tagTextClassName}>
              #{tag.name}
            </span>
          ))}
        </div>
        <div className={statusRowClassName}>
          <span className={`${statusTextClassName} ${book.isFinished ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>
            {book.isFinished ? "已完结" : "连载中"}
          </span>
          {book.isFinished ? (
            <span className={`${statusTextClassName} bg-surface border border-secondary/30 text-secondary`}>
              {formatWordCount(book.wordCount)}
            </span>
          ) : null}
          <span className={`${statusTextClassName} bg-surface border border-secondary/30 text-secondary`}>
            {formatUpdateDate(book.lastUpdated)} 更新
          </span>
        </div>
      </div>

      {showChevron ? (
        <div className="hidden md:flex items-center text-secondary group-hover:text-primary">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      ) : null}

      {trailing}
    </Link>
  );
}
