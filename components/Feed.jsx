'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import PromptCardSkeleton from "./PromptCardSkeleton ";


const PromptCardList = ({ data, handleTagClick, searchText }) => {

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  if (data.length === 0) {
    // Hiển thị skeleton
    return (
      <div className="prompt_layout mt-16">
        {[...Array(3)].map((_, index) => (
          <PromptCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  return (<>
    <motion.div
      className="prompt_layout mt-16"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {data.map((post) => (
        <motion.div
          variants={item} key={post._id}>
          <PromptCard
            key={post._id}
            post={post}
            searchText={searchText}
            handleTagClick={handleTagClick}
          />
        </motion.div>
      ))}
    </motion.div>
  </>)
}


const Feed = () => {

  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // filter prompts
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setAllPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchTextInput) => {
    const regex = new RegExp(searchTextInput, "gi"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  // search

  const handleSearchChange = async (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );

  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  };


  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
      >
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchResults}
          searchText={searchText}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed