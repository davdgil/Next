"use client" 
// components/SearchBar.js
// components/SearchBar.js
import React, { useRef } from "react";

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef(null);

  const handleSearch = () => {
    const searchTerm = inputRef.current.value;
    console.log('Valor del input:', searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar comercio..."
        ref={inputRef}
        onChange={handleSearch}
        className="text-black" 
      />
    </div>
  );
};

export default SearchBar;

