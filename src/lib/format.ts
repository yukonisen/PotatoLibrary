export function formatWordCount(count?: number) {
  if (!count || count <= 0) return "未知";
  if (count >= 10000) return `${(count / 10000).toFixed(1)} 万字`;
  return `${count} 字`;
}

export function formatUpdateDate(date: Date | string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "未知";
  return parsed.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
