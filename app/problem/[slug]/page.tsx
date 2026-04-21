import { getProblemBySlug, getAllProblems } from '@/lib/problems';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const difficultyColor: Record<string, string> = {
  Easy: 'var(--green)',
  Medium: 'var(--yellow)',
  Hard: 'var(--red)',
};

export async function generateStaticParams() {
  const problems = getAllProblems();
  return problems.map(p => ({ slug: p.slug }));
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) notFound();

  const processed = await remark().use(html).process(problem.content);
  const contentHtml = processed.toString();

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 1.5rem' }}>

      {/* Breadcrumb */}
      <div style={{ marginBottom: '2rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>~/dsa-vault</Link>
        <span style={{ margin: '0 0.5rem', color: 'var(--text-dim)' }}>/</span>
        <span>{problem.slug}</span>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
        fontWeight: 800,
        color: 'var(--text)',
        lineHeight: 1.2,
        marginBottom: '1.25rem',
      }}>
        {problem.title}
      </h1>

      {/* Meta row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem', alignItems: 'center' }}>
        <span style={{
          fontSize: '0.8rem',
          color: difficultyColor[problem.difficulty] || 'var(--text-muted)',
          background: problem.difficulty === 'Easy' ? 'var(--green-dim)' :
            problem.difficulty === 'Hard' ? 'var(--red-dim)' : 'var(--yellow-dim)',
          padding: '0.2rem 0.6rem',
          borderRadius: 4,
        }}>
          {problem.difficulty}
        </span>

        <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>·</span>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {problem.topic}
        </span>

        {problem.date && (
          <>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>·</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{problem.date}</span>
          </>
        )}
      </div>

      {/* Tags */}
      {problem.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {problem.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 3,
              background: 'var(--accent-dim)', color: 'var(--accent)',
            }}>{tag}</span>
          ))}
        </div>
      )}

      {/* Companies */}
      {problem.companies.length > 0 && (
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {problem.companies.map(c => (
            <span key={c} style={{
              fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 3,
              background: 'var(--cyan-dim)', color: 'var(--cyan)',
              border: '1px solid rgba(103,232,249,0.15)',
            }}>{c}</span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', marginBottom: '2rem' }} />

      {/* Content */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Back link */}
      <div style={{ marginTop: '4rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <Link href="/" style={{
          color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8rem',
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        }}>
          ← back to vault
        </Link>
      </div>
    </main>
  );
}
