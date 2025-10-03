import React from 'react';

export default function CategoryFilter({ categories, selectedCategories, onCategoryChange }) {

    const categoryColors = {
    "Surveys and Forms": "#639af2ff",
    "Digital Marketing": "#ed6bacff",
    "Platform News and Updates": "#59edbbff",
    "Tips and Best Practise": "#efb34cff",
    "Data Management": "#8789f3ff",
    "Marketing Analytics": "#ea6666ff",
    "Landing Pages": "#45894eff",
    "Ecommerce" : "#17dcebff",
    "Email Marketing":"#ebdd71ff",
    "Marketing Automation": "#66e979ff"
  };

  return (
    <ul className="cat-filter" role="tablist" aria-label="Filter by category">
      {categories.map(cat => (
        <li key={cat}>
          <button
            role="tab"
            aria-selected={selectedCategories.includes(cat)}
            className={`cat-option ${selectedCategories.includes(cat) ? 'is-active' : ''}`}
            onClick={() => onCategoryChange(cat)}
            style={{
              backgroundColor: cat!== "All" ? categoryColors[cat] || "#f3f4f6" : "#f3f4f6",
              color:"#111"

            }}
          >
            {cat}
          </button>
        </li>
      ))}
    </ul>
  );
}
