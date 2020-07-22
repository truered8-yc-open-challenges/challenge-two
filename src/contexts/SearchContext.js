import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export default (props) => {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {props.children}
    </SearchContext.Provider>
  );
};
