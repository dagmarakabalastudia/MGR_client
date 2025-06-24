import React, { useState } from "react";
import "./Categories.css";
import AddNewCategory from "../AddNewCategory/AddNewCategory";
import { BsPlus } from "react-icons/bs";
import * as BsIcons from "react-icons/bs";

export default function Categories({
  categories,
  addNew,
  budgetId,
  setCategoriesToFilter,
  filteredCategory,
  iconsList,
}) {
  const [openPopupToAdd, setOpenPopupToAdd] = useState(false);
  return (
    <div className="categories">
      <div className="categories__list">
        Kategorie:
        <button
          className={`categories__item ${!filteredCategory ? "active" : ""}`}
          onClick={() => setCategoriesToFilter(null)}
        >
          Wszystkie
        </button>
        {categories
          ? categories.map((category) => {
              const Icon = BsIcons[category?.icon];
              return (
                <button
                  key={`categories-${category.name}-${category.moneyLimit}`}
                  className={`categories__item ${
                    filteredCategory === category._id ? "active" : ""
                  }`}
                  style={{
                    backgroundColor: category?.color
                      ? `${category.color}22`
                      : "transparent",
                  }}
                  onClick={() => setCategoriesToFilter(category._id)}
                >
                  {Icon ? (
                    <div className="categories__icon">
                      <Icon />
                    </div>
                  ) : (
                    ""
                  )}
                  {category.name}
                </button>
              );
            })
          : ""}
        {categories.length < 10 ? (
          <div className="categories__btnWrapper">
            <button
              className="categories__button"
              onClick={() => {
                setOpenPopupToAdd(true);
              }}
            >
              <BsPlus />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {openPopupToAdd ? (
        <AddNewCategory
          setOpenPopupToAdd={setOpenPopupToAdd}
          onSubmitBehavior={addNew}
          budgetId={budgetId}
          iconsList={iconsList}
        />
      ) : (
        ""
      )}
    </div>
  );
}
