// /app/search/page.jsx

// I'm using this force-dynamic in route.js and search/page.js which helps me in making this one as dynamic not static as they both use request.url
// which used to geenerate page statically at build time .
export const dynamic = 'force-dynamic'
import Image from "next/image";
import Link from "next/link";

// import "../blogs/blogs.css";

const SearchPage = async ({ searchTerms }) => {
  const searchTerm = searchTerms || "";

  // Fetch posts from your API
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getdata?limit=1000`); 
  const {data} = await res.json();// Replace with your API URL

  // Filter posts based on searchTerm
  const filteredPosts = data.filter(
    (post) =>
    
      post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchTerm.toLowerCase())
      // The some method tests whether at least one element in the array passes the test implemented by the provided function
      
  );

  return (
    <section className="blog-single-post">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-xs-12 heading-main">
            <h3>
              Search Results for: <span>{searchTerm}</span>
            </h3>
            <div className="row blog-image-content-center py-5">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <div className="col-sm-4 col-xs-12" key={index}>
                    <div className="image">
                      <Image
                        src={
                          post.yoast_head_json.schema["@graph"][0].thumbnailUrl
                        }
                        alt={`img${index + 1}`}
                        width={700}
                        height={340}
                      />
                    </div>
                    <div className="content">
                      <h3>
                        <Link href={`/blog/${post.slug}`}>
                          {post.title.rendered}
                        </Link>
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered
                            .replace(/<p>/g, "")
                            .replace(/<\/p>/g, ""),
                        }}
                      />
                      <span className="name">
                        {post.yoast_head_json.schema["@graph"][4].image.caption}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No results found for &quot;{searchTerm}&quot;.</p>

              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
