import { NextResponse } from 'next/server';
import { getAllProblems } from '@/lib/problems';

export const dynamic = 'force-dynamic';

export async function GET() {
  const problems = getAllProblems().map(({ content: _content, ...rest }) => rest);
  return NextResponse.json(problems);
}
