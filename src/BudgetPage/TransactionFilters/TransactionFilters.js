import React, { useState } from "react";
import "./TransactionFilters.css";
import Select from "react-select";
import { BsFilter, BsX } from "react-icons/bs";

export default function TransactionFilters({
  filteredText,
  filteredPriceMin,
  filteredPriceMax,
  filteredDateFrom,
  filteredDateTo,
  filteredOwners,
  isIncome,
  isExpense,
  setFilteredText,
  setFilteredPriceMin,
  setFilteredPriceMax,
  setFilteredDateFrom,
  setFilteredDateTo,
  setFilteredOwners,
  setIsIncome,
  setIsExpense,
  usersList,
}) {
  const [addClassToOpen, setAddClassToOpen] = useState(false);
  return (
    <div>
      <div
        className={`transactionFilters__icon ${addClassToOpen ? "closed" : ""}`}
        onClick={() => setAddClassToOpen(true)}
      >
        <BsFilter />
      </div>
      <div className={`transactionFilters ${addClassToOpen ? "showed" : ""}`}>
        <div
          className="transactionFilters__close"
          onClick={() => setAddClassToOpen(false)}
        >
          <BsX />
        </div>
        <div className="transactionFilters__text">Wyszukaj:</div>
        <div className="customFormElement">
          <label htmlFor="filteredText">Tekst:</label>
          <input
            type="text"
            name="filteredText"
            className="customInput"
            value={filteredText || ""}
            onChange={(e) => {
              setFilteredText(e.target.value);
            }}
          />
        </div>
        <div className="customFormElement">
          <label htmlFor="filteredPriceMin">Cena od:</label>
          <input
            type="number"
            className="customInput"
            min="0"
            name="filteredPriceMin"
            value={filteredPriceMin || undefined}
            onChange={(e) =>
              setFilteredPriceMin(
                Math.round(parseFloat(e.target.value) * 100) / 100
              )
            }
          />
        </div>
        <div className="customFormElement">
          <label htmlFor="filteredPriceMax">Cena do:</label>

          <input
            type="number"
            min="0"
            className="customInput"
            name="filteredPriceMax"
            value={filteredPriceMax || undefined}
            onChange={(e) =>
              setFilteredPriceMax(
                Math.round(parseFloat(e.target.value) * 100) / 100
              )
            }
          />
        </div>
        <div className="customFormElement">
          <label htmlFor="filteredDateFrom">Data od:</label>
          <input
            type="date"
            name="filteredDateFrom"
            className="customInput"
            value={filteredDateFrom || undefined}
            onChange={(e) => setFilteredDateFrom(e.target.value)}
          />
        </div>
        <div className="customFormElement">
          <label htmlFor="filteredDateTo">Data do:</label>
          <input
            type="date"
            name="filteredDateTo"
            className="customInput"
            value={filteredDateTo || undefined}
            onChange={(e) => setFilteredDateTo(e.target.value)}
          />
        </div>
        <div className="customFormElement" style={{ minWidth: "200px" }}>
          <label htmlFor="filteredOwners">Utworzony przez:</label>
          <Select
            placeholder=" "
            options={usersList.map((c) => {
              return { value: c._id, label: c.username };
            })}
            onChange={(el) => {
              setFilteredOwners(
                el.map((c) => {
                  return { _id: c.value, username: c.label };
                })
              );
            }}
            isMulti={true}
            name="filteredOwners"
            value={filteredOwners.map((c) => {
              return { value: c._id, label: c.username };
            })}
          />
        </div>
        <div className="customFormElement center">
          <label htmlFor="isExpense">Tylko wydatki:</label>
          <input
            type="checkbox"
            name="isExpense"
            className="customInput"
            checked={isExpense || false}
            onChange={(e) => {
              setIsExpense(e.target.checked);
              if (e.target.checked) {
                setIsIncome(false);
              }
            }}
          />
        </div>
        <div className="customFormElement center">
          <label htmlFor="isIncome">Tylko przychody:</label>
          <input
            name="isIncome"
            type="checkbox"
            className="customInput"
            checked={isIncome || false}
            onChange={(e) => {
              setIsIncome(e.target.checked);

              if (e.target.checked) {
                setIsExpense(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
