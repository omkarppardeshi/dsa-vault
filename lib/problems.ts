import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const problemsDirectory = path.join(process.cwd(), 'problems');

export interface Problem {
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  companies: string[];
  topic: string;
  solved: boolean;
  date: string;
  content: string;
}

export function getAllProblems(): Problem[] {
  if (!fs.existsSync(problemsDirectory)) return [];

  const fileNames = fs.readdirSync(problemsDirectory).filter(f => f.endsWith('.md'));

  const problems = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(problemsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      difficulty: data.difficulty || 'Medium',
      tags: data.tags || [],
      companies: data.companies || [],
      topic: data.topic || 'General',
      solved: data.solved ?? true,
      date: data.date ? String(data.date) : '',
      content,
    } as Problem;
  });

  return problems.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProblemBySlug(slug: string): Problem | null {
  try {
    const fullPath = path.join(problemsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      difficulty: data.difficulty || 'Medium',
      tags: data.tags || [],
      companies: data.companies || [],
      topic: data.topic || 'General',
      solved: data.solved ?? true,
      date: data.date ? String(data.date) : '',
      content,
    };
  } catch {
    return null;
  }
}

export function getAllTags(): string[] {
  const problems = getAllProblems();
  const tagSet = new Set<string>();
  problems.forEach(p => p.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getAllTopics(): string[] {
  const problems = getAllProblems();
  const topicSet = new Set<string>();
  problems.forEach(p => topicSet.add(p.topic));
  return Array.from(topicSet).sort();
}
