import React, { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';

const FilterComponent = ({ onFilterChange }) => {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (e) => {
    const newText = e.target.value;
    setFilterText(newText);
    onFilterChange(newText);
  };

  return (
    <div className='mt-1'>
      <div className='flex items-center space-x-2 border-b border-gray-300 py-2'>
        <MdOutlineSearch />
        <input
          type='text'
          placeholder='Recherche par nom'
          value={filterText}
          onChange={handleFilterChange}
          className='border-none outline-none'
        />
      </div>
    </div>
  );
};

export default FilterComponent;
