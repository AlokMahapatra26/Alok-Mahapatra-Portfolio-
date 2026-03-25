import Link from 'next/link';
import data from '../../data.json';
import Parser from 'rss-parser';

export const revalidate = 3600; // revalidate every hour

export default async function Personal() {
    let recentMovies: any[] = [];
    try {
        const parser = new Parser();
        const feed = await parser.parseURL(data.personal.letterboxd as string + 'rss/');
        // Grab the top 4 items
        recentMovies = feed.items.slice(0, 4).map((item: any) => {
            let cleanTitle = item.title || 'Unknown';
            let year = '';
            let rating = '';

            // Extract rating
            const ratingMatch = cleanTitle.match(/ - (★.*?)( \(|$)/);
            if (ratingMatch) {
                rating = ratingMatch[1];
            }

            // Clean up title
            const yearMatch = cleanTitle.match(/, (\d{4})/);
            if (yearMatch) {
                year = yearMatch[1];
                cleanTitle = cleanTitle.split(',')[0];
            } else if (cleanTitle.includes(' - ')) {
                cleanTitle = cleanTitle.split(' - ')[0]; // remove rating if no year
            }

            // Extract Poster image
            let poster = '';
            if (item.content) {
                const imgMatch = item.content.match(/src="([^"]+)"/);
                if (imgMatch) poster = imgMatch[1];
            }

            // Extract Review Snippet
            let review = item.contentSnippet || '';
            if (review.includes('This review may contain spoilers.')) {
                review = review.replace('This review may contain spoilers.', '').trim();
            }

            return {
                title: cleanTitle,
                year: year || '',
                rating: rating,
                review: review,
                poster: poster,
                link: item.link
            };
        });
    } catch (error) {
        console.error("Failed to parse Letterboxd RSS:", error);
    }

    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-300 dark:selection:bg-neutral-700">
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">

                {/* Header / Navigation */}
                <header className="mb-12 flex justify-between items-center">
                    <Link href="/" className="text-xs font-semibold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back
                    </Link>
                    <span className="font-serif text-sm italic text-neutral-400">Personal Vault</span>
                </header>

                {/* Writings Section */}
                <section className="font-sans mb-12">
                    <h2 className="font-serif text-lg mb-6 italic">My Writings</h2>

                    <div className="mb-8">
                        <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">Stories & Novels (PDF)</h3>
                        <div className="space-y-4">
                            {data.personal.writings.books.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 block"
                                >
                                    <h4 className="text-sm font-medium group-hover:underline underline-offset-4 decoration-1">{item.title}</h4>
                                    <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0 uppercase tracking-widest font-medium">{item.year}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">Random Blogs</h3>
                        <div className="space-y-4">
                            {data.personal.writings.blogs.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.link}
                                    className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 block"
                                >
                                    <h4 className="text-sm font-medium group-hover:underline underline-offset-4 decoration-1">{item.title}</h4>
                                    <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0 uppercase tracking-widest font-medium">{item.date}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Music Section */}
                <section className="font-sans mb-12">
                    <h2 className="font-serif text-lg mb-6 italic">On Repeat</h2>
                    <div className="w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                        <iframe
                            title="Spotify Embed: Recommendation Playlist"
                            src={`https://open.spotify.com/embed/playlist/3LWVLAQnzhj9qA9PVSNtcS?utm_source=generator&theme=0`}
                            width="100%"
                            height="100%"
                            style={{ minHeight: '360px' }}
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        />
                    </div>
                </section>

                {/* Movies Section */}
                <section className="font-sans mb-12">
                    <h2 className="font-serif text-lg mb-8 italic">Films Log</h2>

                    {/* All-Time Favorites */}
                    <div className="mb-10">
                        <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">All-Time Favorites</h3>
                        <div className="space-y-4">
                            {data.personal.favoriteMovies.map((movie, i) => (
                                <div key={i} className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 block">
                                    <span className="text-sm font-medium">{movie.title}</span>
                                    <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0 uppercase tracking-widest font-medium">{movie.director}, {movie.year}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Watches (RSS) */}
                    <div className="flex justify-between items-baseline mb-6 border-t border-neutral-200 dark:border-neutral-800 pt-8">
                        <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-500">Recent Watches</h3>
                        <a href={data.personal.letterboxd as string} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200">
                            View Diary &rarr;
                        </a>
                    </div>
                    {recentMovies.length > 0 ? (
                        <div className="space-y-1">
                            {recentMovies.map((movie, i) => (
                                <a key={i} href={movie.link} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 py-3 border-b border-neutral-200 dark:border-neutral-800 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors -mx-4 px-4 rounded-xl">
                                    {movie.poster && (
                                        <div className="shrink-0 pt-1">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={movie.poster} alt={movie.title} className="w-12 sm:w-16 rounded shadow-sm border border-neutral-200 dark:border-neutral-800" />
                                        </div>
                                    )}
                                    <div className="flex flex-col flex-1 min-w-0 py-1">
                                        <div className="flex flex-wrap items-baseline gap-2 mb-1">
                                            <span className="text-sm font-medium group-hover:underline underline-offset-4 decoration-1 truncate">{movie.title}</span>
                                            {movie.year && <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">{movie.year}</span>}
                                        </div>
                                        {movie.rating && <span className="text-xs text-amber-500 dark:text-amber-400 mb-1.5 tracking-wider">{movie.rating}</span>}
                                        {movie.review && <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed italic">"{movie.review}"</p>}
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <a
                                href={data.personal.letterboxd as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 block"
                            >
                                <h3 className="text-sm font-medium group-hover:underline underline-offset-4 decoration-1">Letterboxd Profile</h3>
                                <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0 uppercase tracking-widest font-medium">Follow</span>
                            </a>
                        </div>
                    )}
                </section>

            </div>
        </main>
    );
}
