import React, { useEffect, useMemo, useState } from 'react';
import CategoryFilter from './category_filter/category_filter';
import Pagination from './pagination/pagination';
import PostStructure from './post_structure/post_structure';
import logo from "../assets/logo.svg"

export default function App() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 10;

  // Fetch posts from MirageJS mock API
  useEffect(() => {
    (async () => {
      try {
        // fetch makes a network request to the URL to retrieve the mock data.
        // The URL is a fake API endpoint created by MirageJS
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json(); // Convert response into javascript object
        setAllPosts(json.posts); // Update allPosts state
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Category list
  const categories = useMemo(() => {
    // Extracting a list of categories
    const names = allPosts.flatMap(p => (p.categories || []).map(c => c.name));
    // Using set to ensure no repetition of categories
    return ['All', ...new Set(names)];
  }, [allPosts]);

  // Filter by category (used useMemo to improve efficiency as it would be ran if one of its dependencies change)
  const filtered_posts = useMemo(() => {
    if ((selectedCategories.length === 1 && selectedCategories[0] === 'All') || selectedCategories.length === 0) 
      return allPosts;
    // filtering out all posts that does not consists of the selectedCategories
    return allPosts.filter(p =>
      (p.categories || []).some(c => selectedCategories.includes(c.name))
    );
  }, [allPosts, selectedCategories]);

  // Pagination
  const totalPages = Math.ceil(filtered_posts.length / POSTS_PER_PAGE) || 1;
  const indexOfLast = currentPage * POSTS_PER_PAGE;
  const indexOfFirst = indexOfLast - POSTS_PER_PAGE;
  const currentPosts = filtered_posts.slice(indexOfFirst, indexOfLast);

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) => {
      if (cat === "All") {
        return ["All"]; // reset everything if "all" is chosen
      }
      if (prev.includes(cat)) {
        return prev.filter((c) => c !== cat); // deselect
      }
      return [...prev, cat]; // add to selection
    });
    setCurrentPage(1);
  };

  if (loading) return <main>Loading posts…</main>;
  if (error)   return <main>Error: {error}</main>;

  return (
    <div className="App">
      <header className='app-header'>
        <img src={logo} alt="Lizard Global Logo" className="app-logo" />
        <h1>Lizard Global Blog Posts</h1>
      </header>

      <main>
        {/* Filter options */}
        <nav aria-label="Category Filter">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </nav>

        {/* List of Posts */}
        <section aria-labelledby="post-list-heading">
          <h2 id="post-list-heading" className="visually-hidden">Blog Posts</h2>
          <PostStructure posts={currentPosts} />
        </section>

        {/* Numbering pages */}
        <nav aria-label="Pagination Navigation">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </nav>
      </main>
  
      <footer>
        <p>&copy; {new Date().getFullYear()} Lizard Global. All rights reserved.</p>
      </footer>
    </div>
  );
}
