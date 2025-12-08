"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import { PromptSkeleton } from "./PromptSkeleton";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-4 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [isLoading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


const fetchPosts = async () => {
  try {
    setLoading(true);

    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  } catch (error) {
    console.error("Failed to fetch prompts:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); 
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

return (
  <section className='feed'>
    <form className='relative w-full max-w-xl flex-center'>
      <input
        type='search'
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
      />
    </form>

    {/* No Search Results Message */}
    {(searchText && !isLoading && searchedResults.length === 0) && (
      <h2 className='mt-10 font-semibold text-gray-500 text-xl'>
        No prompts found
      </h2>
    )}

    {isLoading ? (
      <PromptSkeleton /> 
    ) : (
      <>
        {searchText ? (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList
            data={allPosts}
            handleTagClick={handleTagClick}
          />
        )}
      </>
    )}
  </section>
);

};

export default Feed;
