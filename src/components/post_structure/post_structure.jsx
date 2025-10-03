import React from "react";

export default function PostStructure({ posts }) {

  const categoryColors = {
    "Surveys and Forms": "#639af2ff",
    "Digital Marketing": "#ed6bacff",
    "Platform News and Updates": "#59edbbff",
    "Tips and Best Practise": "#efb34cff",
    "Data Management": "#8789f3ff",
    "Marketing Analytics": "#ea6666ff",
    "Landing Pages": "#3a8544ff",
    "Ecommerce" : "#17dcebff",
    "Email Marketing":"#ebdd71ff",
    "Marketing Automation": "#66e979ff"
  };

  if (!posts.length) return <p>No posts found.</p>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          {/* 1. Title */}
          <h3 className="post-title">{post.title}</h3>

          {/* 2. Author */}
          {post.author && (
            <div className="post-author">
              {post.author.avatar && (
                <img
                  src={post.author.avatar}
                  alt={`Avatar of ${post.author.name}`}
                  className="author-avatar"
                />
              )}
              <span>{post.author.name}</span>
            </div>
          )}

          {/* 3. Categories */}
          <div className="post-categories">
            {post.categories?.map((cat) => (
              <span key={cat.id} className="category-style" style={{ backgroundColor: categoryColors[cat.name] || "#9ca3af" }}>
                {cat.name}
              </span>
            ))}
          </div>

          {/* 4. Summary */}
          <p className="post-summary">{post.summary.substring(0, 200)}...</p>

          {/* 5. Publish date */}
          <time className="post-date" dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString()}
          </time>
        </div>
      ))}
    </div>
  );
}