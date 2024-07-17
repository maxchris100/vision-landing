import DefaultLayout from '../../components/layouts/default';
import Filer from '@cloudcannon/filer';
import PostSummary from '../../components/posts/summary';
import data from '../../lib/data';
import { ArticleJsonLd } from 'next-seo';
const filer = new Filer({ path: 'content' });
const { DateTime } = require("luxon");

export default function Post({ page, posts }) {

	const wordCount = page.content.split(" ").length;
	const readingTime  = Math.floor(wordCount / 183)

	return (
		<DefaultLayout page={page}>
			
			<ArticleJsonLd
				type="BlogPosting"
				url={`${data.site.baseurl}${page.data.seo?.canonical_url || page.slug}`}
				title={page.data.title}
				images={[page.data.seo?.featured_image || page.data.featuredImg.image || null]}
				datePublished={page.data.date}
				dateModified={page.data.date}
				authorName={page.data.author}
				description={page.data.seo?.page_description}
			/>
			<section className="blog-details">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<article className="blog-single">
						<div className="inner-blog-details">
							<h2 className="w-xxl-70 w-xl-80 w-100">{page.data.title}</h2>
							<div className="inner-blog-details-meta">
								<ul className="list-unstyled">
									<li className="list-inline-item">
									<p>{DateTime.fromISO(page.data.date, 'string').toLocaleString(DateTime.DATE_FULL)}</p>
									</li>
									<li className="list-inline-item">
										<p>{ page.data.author}</p>
									</li>
									<li className="list-inline-item">
										<p>{ readingTime } <span>minutes read</span></p>
									</li>
									<li className="list-inline-item">
										<p>{ wordCount } <span>words</span></p>
									</li>
								</ul>
							</div>
						</div>
						<div className="rounded-box mb-xxl-11 mb-8">
							<img
								src={page.data.featuredImg.image}
								className="w-100"
								alt={page.data.featuredImg.image_alt}
							/>
						</div>
						<div style={{"max-width": "900px", margin: "0 auto" }} dangerouslySetInnerHTML={{ __html: page.content_html }}></div>
						</article>
					</div>
				</div>
			</div>
			</section>
			
			
			<section className="video pb-xxl-22 pb-lg-18 pb-12" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
				<div className="container">
					<div className="row">
						<div className="col-lg-10 mx-auto">
							<div className="banner">
								<div className="rounded-box">
									<img
										src={page.data.video.image}
										className="w-100"
										alt={page.data.video.image_alt}
										loading="lazy"
									/>
								</div>
								<div className="effect-one"></div>
								<div className="effect-two"></div>
								<div className="video-iframe d-flex align-items-center justify-content-center">
									<div className="video-icon me-sm-9 me-8">
										<a className="popup-vimeo" href={page.data.video.video_url}>
											<svg
												width="28"
												height="32"
												viewBox="0 0 28 32"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M26 12.5359C28.6667 14.0755 28.6667 17.9245 26 19.4641L6.5 30.7224C3.83333 32.262 0.499998 30.3375 0.499999 27.2583L0.5 4.74167C0.5 1.66247 3.83333 -0.262033 6.5 1.27757L26 12.5359Z"
													fill="white"
												/>
											</svg>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			
			<section className="blog-related position-relative">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="blog-section">
						<h2 className="blog-section-title">Recent Activites</h2>
						</div>
					</div>
				</div>
				<div className="row">

					{ posts.map((post, i) => (
						<PostSummary post={post} key={i}></PostSummary>
					))}
				</div>
			</div>
			</section>
		</DefaultLayout>
	);
}

export async function getStaticPaths() {
	const slugs = (await filer.listItemSlugs('posts')).map((slug) => ({ params: { slug } }));
	const ignored = {
	};

	return {
		paths: slugs.filter(({ params }) => !ignored[params.slug]),
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const page = await filer.getItem(`${params.slug}.md`, { folder: 'posts' });
	const paginatedPosts = await filer.getPaginatedItems('posts', { sortKey: 'date', pagination: {size: 3, page: 1} });

	return {
		props: {
			page: JSON.parse(JSON.stringify(page)),
			posts: JSON.parse(JSON.stringify(paginatedPosts.data))
		}
	};
}
