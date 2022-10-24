import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      name="query"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      className="form-control my-2"
      type="text"
      placeholder="Search..."
    />
  );
};

export default SearchBar;
