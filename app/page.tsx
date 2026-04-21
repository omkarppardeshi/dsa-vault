'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Problem {
  slug: string;
  title: string;
  difficulty: string;
  tags: string[];
  companies: string[];
  topic: string;
  date: string;
}

const difficultyColor: Record<string, string> = {
  Easy: 'var(--green)',
  Medium: 'var(--yellow)',
  Hard: 'var(--red)',
};

export default function HomePage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState('');
  const [filterDiff, setFilterDiff] = useState('All');
  const [filterTopic, setFilterTopic] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/problems')
      .then(r => r.json())
      .then(data => { setProblems(data); setLoading(false); });
  }, []);

  const topics = ['All', ...Array.from(new Set(problems.map(p => p.topic))).sort()];
  const diffs = ['All', 'Easy', 'Medium', 'Hard'];

  const filtered = problems.filter(p => {
    const q = search.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.companies.some(c => c.toLowerCase().includes(q)) ||
      p.topic.toLowerCase().includes(q);
    const matchDiff = filterDiff === 'All' || p.difficulty === filterDiff;
    const matchTopic = filterTopic === 'All' || p.topic === filterTopic;
    return matchSearch && matchDiff && matchTopic;
  });

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem', letterSpacing: '0.15em' }}>
          ~/omkar/dsa-vault
        </div>
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          color: 'var(--text)',
          lineHeight: 1.1,
          marginBottom: '0.5rem',
        }}>
          DSA Vault<span className="cursor-blink" />
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          {problems.length} problems solved · interview-ready reference
        </p>
      </div>

      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          type="text"
          placeholder="$ search by title, tag, company..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '0.75rem 1rem',
            color: 'var(--text)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.875rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {diffs.map(d => (
            <button key={d} onClick={() => setFilterDiff(d)} style={{
              padding: '0.3rem 0.75rem', borderRadius: 4,
              border: `1px solid ${filterDiff === d ? 'var(--accent)' : 'var(--border)'}`,
              background: filterDiff === d ? 'var(--accent-dim)' : 'transparent',
              color: filterDiff === d ? 'var(--accent)' : 'var(--text-muted)',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', cursor: 'pointer',
            }}>
              {d}
            </button>
          ))}
          <div style={{ width: 1, background: 'var(--border)', margin: '0 0.25rem' }} />
          {topics.map(t => (
            <button key={t} onClick={() => setFilterTopic(t)} style={{
              padding: '0.3rem 0.75rem', borderRadius: 4,
              border: `1px solid ${filterTopic === t ? 'var(--cyan)' : 'var(--border)'}`,
              background: filterTopic === t ? 'var(--cyan-dim)' : 'transparent',
              color: filterTopic === t ? 'var(--cyan)' : 'var(--text-muted)',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', cursor: 'pointer',
            }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 90px 120px',
        padding: '0.5rem 1rem', borderBottom: '1px solid var(--border)',
        color: 'var(--text-dim)', fontSize: '0.7rem', letterSpacing: '0.12em',
        textTransform: 'uppercase', marginBottom: '0.25rem',
      }}>
        <span>Problem</span><span>Difficulty</span><span>Companies</span>
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-muted)', padding: '2rem 1rem' }}>loading problems...</div>
      ) : filtered.length === 0 ? (
        <div style={{ color: 'var(--text-muted)', padding: '2rem 1rem' }}>no matches found</div>
      ) : (
        <div>
          {filtered.map((p, i) => (
            <Link key={p.slug} href={`/problem/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 90px 120px',
                  padding: '0.875rem 1rem', borderBottom: '1px solid var(--border)',
                  cursor: 'pointer', transition: 'background 0.15s',
                  animation: `fadeUp 0.3s ease ${i * 0.04}s both`,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div>
                  <div style={{ color: 'var(--text)', fontSize: '0.875rem', marginBottom: '0.3rem' }}>{p.title}</div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {p.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: 3,
                        background: 'var(--accent-dim)', color: 'var(--accent)',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: difficultyColor[p.difficulty] || 'var(--text-muted)', alignSelf: 'center' }}>
                  {p.difficulty}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                  {p.companies.slice(0, 2).join(', ')}{p.companies.length > 2 && ` +${p.companies.length - 2}`}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div style={{
        marginTop: '4rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)',
        color: 'var(--text-dim)', fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between',
      }}>
        <span>omkar · dsa-vault</span>
        <span>add problems → /problems/*.md → git push</span>
      </div>
    </main>
  );
}
