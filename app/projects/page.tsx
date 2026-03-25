import Link from 'next/link';
import data from '../../data.json';

export default function Projects() {
    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-300 dark:selection:bg-neutral-700">
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">

                {/* Header / Navigation */}
                <header className="mb-16 flex justify-between items-center border-b border-neutral-200 dark:border-neutral-800 pb-8">
                    <Link href="/" className="text-xs font-semibold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back
                    </Link>
                    <span className="font-serif text-sm italic text-neutral-400">All Projects</span>
                </header>

                {/* Projects List Expanded */}
                <section className="font-sans space-y-16">
                    {data.projects.map((project, i) => (
                        <article key={i} className="group">
                            <header className="mb-4">
                                <h2 className="font-serif text-2xl md:text-3xl font-medium mb-1">{project.name}</h2>
                            </header>

                            <p className="leading-relaxed text-sm md:text-base font-light text-neutral-500 dark:text-neutral-400 max-w-2xl mb-6">
                                {project.description}
                            </p>

                            <div className="flex items-center gap-6">
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                    GitHub
                                </a>
                                <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                                    Live Demo
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                </a>
                            </div>
                        </article>
                    ))}
                </section>

            </div>
        </main>
    );
}
