import Link from 'next/link';
import data from '../../../data.json';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
    return data.personal.writings.blogs.map((blog) => ({
        slug: blog.link.replace('/blog/', ''),
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Try to find it in philosophy
    const blogMeta = data.personal.writings.blogs.find(b => b.link === `/blog/${slug}`);

    // Fetch Markdown content based on the slug.
    const contentPath = path.join(process.cwd(), 'content', 'blogs', `${slug}.md`);
    let content = '';

    try {
        content = fs.readFileSync(contentPath, 'utf8');
    } catch (e) {
        return (
            <main className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-300 dark:selection:bg-neutral-700 p-6 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-serif mb-4">404 - Writing not found</h1>
                <Link href="/personal" className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors">Return to Vault</Link>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-300 dark:selection:bg-neutral-700">
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">

                {/* Header / Navigation */}
                <header className="mb-16 border-b border-neutral-200 dark:border-neutral-800 pb-8">
                    <Link href="/personal" className="inline-flex text-xs font-semibold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 items-center gap-2 mb-8">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Vault
                    </Link>
                    <h1 className="font-serif text-3xl md:text-5xl font-medium mb-4 leading-tight">{blogMeta?.title || slug}</h1>
                    {blogMeta?.date && (
                        <p className="font-sans text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-medium">
                            Published {blogMeta.date}
                        </p>
                    )}
                </header>

                {/* Markdown Content */}
                <article className="font-sans prose dark:prose-invert max-w-none prose-neutral prose-p:leading-relaxed prose-headings:font-serif prose-headings:font-normal text-neutral-600 dark:text-neutral-400 font-light space-y-6 [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_a]:underline [&_a:hover]:text-neutral-900 dark:[&_a:hover]:text-white">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </article>

            </div>
        </main>
    );
}
