import React, { ChangeEvent, MutableRefObject } from 'react'

export type SearchProps = {
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    searchBarRef: MutableRefObject<HTMLInputElement | null>;
}

const SearchBar = ({handleInputChange, searchBarRef}: SearchProps) => {
  return (
    <input 
        className="pl-4 pr-4 opacity-70 shadow-2xl rounded-full lg:w-64 w-48 h-9 border-slate-500 border-2 bg-slate-700 border-none" 
        type="text" 
        placeholder="Search"
        ref={searchBarRef}
        onChange={(event) => handleInputChange(event)}
    />
  )
}

export default SearchBar