import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const booksDirectory = path.join(process.cwd(), 'data', 'books');

function calculateWordCount(volumes: any[] = []) {
  return volumes.reduce((total: number, vol: any) => {
    return total + (vol.chapters?.reduce((sum: number, ch: any) => sum + (ch.content?.length || 0), 0) || 0);
  }, 0);
}

function resolveLastUpdated(data: any, fileStats: fs.Stats) {
  const manualDate = data?.updatedAt ? new Date(data.updatedAt) : null;
  if (manualDate && !Number.isNaN(manualDate.getTime())) {
    return manualDate;
  }

  // In some deployment environments, mtime can be stale (e.g. bundled artifact timestamp).
  // Use the latest available file timestamp to keep list/detail pages consistent.
  const candidates = [fileStats.mtime, fileStats.ctime, fileStats.birthtime]
    .map((d) => new Date(d))
    .filter((d) => !Number.isNaN(d.getTime()));

  if (candidates.length === 0) {
    return new Date();
  }

  return new Date(Math.max(...candidates.map((d) => d.getTime())));
}

export async function getBookById(id: string) {
  try {
    let fullPath = path.join(booksDirectory, `${id}.yaml`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(booksDirectory, `${id}.yml`);
    }
    
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const fileStats = fs.statSync(fullPath);
    const book = yaml.load(fileContents) as any;

    const wordCount = calculateWordCount(book.volumes);

    return { id, ...book, wordCount, lastUpdated: resolveLastUpdated(book, fileStats) };
  } catch (e) {
    console.error("YAML 解析失败:", e);
    return null;
  }
}

export async function getAllBooks() {
  if (!fs.existsSync(booksDirectory)) return [];
  
  const fileNames = fs.readdirSync(booksDirectory);
  const allBooks = fileNames
    .filter(fileName => fileName.endsWith('.yaml') || fileName.endsWith('.yml'))
    .map(fileName => {
      const id = fileName.replace(/\.(yaml|yml)$/, '');
      const fullPath = path.join(booksDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const fileStats = fs.statSync(fullPath);
      try {
        const data = yaml.load(fileContents) as any;
        return { id, ...data, wordCount: calculateWordCount(data.volumes), lastUpdated: resolveLastUpdated(data, fileStats) };
      } catch (e) {
        return null;
      }
    })
    .filter(book => book !== null);

  return allBooks;
}
