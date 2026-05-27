import type { SetStateAction } from "react";
import type React from "react";
import type { FilterType } from "../types/Filter";
import "./FilterSection.css"

interface FilterSectionProps {
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<SetStateAction<string>>;
  activeFilter: FilterType;
  setActiveFilter: React.Dispatch<SetStateAction<FilterType>>;
}

export function FilterSection({
  searchKeyword,
  setSearchKeyword,
  activeFilter,
  setActiveFilter,
}: FilterSectionProps) {
  return (
    <div className="filter-section">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
      />
      <div className="filter-button">
        <button
          className={activeFilter === "all" ? "active-filter" : ""}
          onClick={() => {
            setActiveFilter("all");
          }}
        >
          <i className="fa-solid fa-list"></i> All
        </button>

        <button
          className={activeFilter === "active" ? "active-filter" : ""}
          onClick={() => {
            setActiveFilter("active");
          }}
        >
          <i className="fa-solid fa-hourglass-half"></i> Active
        </button>

        <button
          className={activeFilter === "completed" ? "active-filter" : ""}
          onClick={() => {
            setActiveFilter("completed");
          }}
        >
          <i className="fa-solid fa-check-double"></i> Completed
        </button>
      </div>
    </div>
  );
}

