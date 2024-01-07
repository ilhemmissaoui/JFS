import React, { useState } from 'react';

const FilterComponentOptions = ({ onFilterChange, options }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (newText) => {
    setFilterText(newText);
    onFilterChange(newText, selectedOption);
  };

  const handleOptionChange = (e) => {
    const newOption = e.target.value;
    setSelectedOption(newOption);
    onFilterChange(filterText, newOption);
  };

  return (
    <div
      className={`flex items-center space-x-2 p-2 mb-4 w-full${
        selectedOption ? 'border-b border-gray-300 w-full' : ''
      }`}
    >
      {/* Dropdown menu with conditional border */}
      <select
        className={`border-b border-gray-300 outline-none p-2 bg-transparent w-full${
          selectedOption ? 'border-none w-full' : ''
        }`}
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value='' disabled hidden>
          2023
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterComponentOptions;
