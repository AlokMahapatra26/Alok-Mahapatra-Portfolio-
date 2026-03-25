import Image from "next/image";

import Link from 'next/link';
import data from '../data.json';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-300 dark:selection:bg-neutral-700">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* Header Section */}
        <header className="space-y-2 mb-8">
          <p className="font-sans text-xs font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
            hello, i&apos;m
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
            <Link href="/personal" className="hover:opacity-70 transition-opacity" title="Enter the Vault">
              {data.name}
            </Link>{" "}
            <span className="font-light italic text-neutral-400 dark:text-neutral-500 text-xl md:text-2xl ml-2">{data.role}</span>
          </h1>
          <p className="font-sans text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-light max-w-2xl leading-relaxed mt-2">
            {data.bio}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6">
            <a
              href={data.links.find(l => l.name === 'GitHub')?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-widest text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>

            <div className="flex items-center gap-4">
              {data.links.filter(l => l.name !== 'GitHub').map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="w-16 h-[1px] bg-neutral-300 dark:bg-neutral-800 mb-8" />

        {/* Projects */}
        <section className="font-sans mb-10 relative z-10 w-full overflow-hidden">
          <h2 className="font-serif text-lg mb-4 italic">Projects</h2>

          <div className="flex flex-col border-t border-neutral-200 dark:border-neutral-800">
            {data.projects.map((project, i) => (
              <details
                key={i}
                className="group border-b border-neutral-200 dark:border-neutral-800 transition-colors [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer py-3 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200">
                  <h3 className="font-serif text-base md:text-lg font-medium">{project.name}</h3>
                  <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                    <div className="absolute w-4 h-[1.5px] bg-current transition-transform duration-300 group-open:rotate-180" />
                    <div className="absolute h-4 w-[1.5px] bg-current transition-transform duration-300 group-open:rotate-90" />
                  </div>
                </summary>

                <div className="pb-4 pt-1 overflow-hidden text-neutral-500 dark:text-neutral-400">
                  <p className="leading-relaxed text-xs md:text-sm font-light max-w-2xl mb-3">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <Link href={project.github} className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      GitHub
                    </Link>
                    <Link href={project.live} className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                      Live Demo
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </Link>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Link href="/projects" className="group inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
              View All projects
              <svg className="transition-transform duration-300 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
        </section>

        {/* Writings */}
        <section className="font-sans mb-10">
          <h2 className="font-serif text-lg mb-4 italic">Writings</h2>

          <div className="space-y-4">
            {data.blogs.map((blog, i) => (
              <a
                key={i}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 block"
              >
                <h3 className="text-sm font-medium group-hover:underline underline-offset-4 decoration-1">{blog.title}</h3>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0 uppercase tracking-widest font-medium">{blog.date}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section className="font-sans mb-10">
          <h2 className="font-serif text-lg mb-4 italic">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {data.technologies.map((tech, i) => (
              <span key={i} className="px-2 py-1 text-xs tracking-wide text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Selected Work / Experience */}
        <section className="font-sans mb-10">
          <h2 className="font-serif text-lg mb-4 italic">Selected Experience</h2>

          <div className="space-y-6">
            {data.experience.map((job, i) => (
              <div key={i} className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium group-hover:underline underline-offset-4 decoration-1">{job.role}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">{job.company} &mdash; {job.description}</p>
                </div>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0 uppercase tracking-widest font-medium">{job.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="font-sans pt-6 border-t border-neutral-200 dark:border-neutral-800 mt-12">
          <div className="flex justify-center sm:justify-start items-center w-full">
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              © {new Date().getFullYear()} {data.name}
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
