import React, { useState, useEffect } from 'react';
import './reflectedxss.css';

const Reflectedxss = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const searchTermHtml = `<p>${searchTerm}</p>`;
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Updating the URL to reflect the search parameter
      const newUrl = `${window.location.pathname}?q=${searchTerm}`;
      window.history.pushState(null, '', newUrl);

      const response = await fetch(`http://localhost:3000/reflectedxss?q=${searchTerm}`);
      const data = await response.json();
      
      // Storing both the blogs and the search term in the state
      setSearchTerm(data.searchTerm);
      setBlogs(data.results);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching blogs");
    }
  };

  const fetchBlogs = async () => {
    const response = await fetch(`http://localhost:3000/reflectedxss`);
    const data = await response.json();
    setBlogs(data.results);
  };

  useEffect(() => {
    fetchBlogs(); // Fetch all blogs initially
  }, []);

  return (
    <div className='reflectedxssContainer'>
      <h1>Welcome to Reflected XSS Vulnerability</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          className='search-input'
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a search term"
          required
        />
        <button type="submit" className='search-button'>Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className='results'>
        {/* Reflecting the search term unsafely using dangerouslySetInnerHTML
            because react automaticly prevent xss vulnerabilities to happen */}
        <div dangerouslySetInnerHTML={{ __html:  searchTermHtml}}/>
        {blogs && blogs.map(blog => (
          <div key={blog.id} className='blog-post'>
            <img src={blog.image_url} alt={blog.title} className='blog-image' />
            <div className="blog-info">
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reflectedxss;
