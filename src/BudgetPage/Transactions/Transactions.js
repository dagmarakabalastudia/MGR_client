import React, { useEffect, useRef, useState } from "react";
import "./Transactions.css";
import { BsCash, BsBarChart, BsDownload, BsArrowLeft } from "react-icons/bs";

import AddNewTransaction from "../AddNewTransaction/AddNewTransaction";
import TransactionItem from "../TransactionItem/TransactionItem";
import EditTransaction from "../AddNewTransaction/EditTransaction";
import DeleteTransaction from "../DeleteParticipant/DeleteTransaction";
import TransactionFilters from "../TransactionFilters/TransactionFilters";
import moment from "moment";
import ChartView from "../ChartView/ChartView";

export default function Transactions({
  transactions,
  addNew,
  budgetId,
  user,
  categories,
  budgetAmount,
  deleteTransaction,
  editTransaction,
  defaultCategory,
  usersList,
}) {
  const chartRef = useRef(null);
  const [openPopupToAdd, setOpenPopupToAdd] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(false);
  const [isExpense, setIsExpense] = useState(true);
  const [viewChart, setViewChart] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [filteredTransactionsData, setFilteredTransactionsData] = useState([]);

  const [filteredText, setFilteredText] = useState();
  const [filteredPriceMin, setFilteredPriceMin] = useState();
  const [filteredPriceMax, setFilteredPriceMax] = useState();
  const [filteredDateFrom, setFilteredDateFrom] = useState();
  const [filteredDateTo, setFilteredDateTo] = useState();
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [filteredIsIncome, setFilteredIsIncome] = useState();
  const [filtteredIsExpense, setFilteredIsExpense] = useState();

  useEffect(() => {
    if (transactions) {
      const filterTransactions = (transactionsList) => {
        let tmpTransactions = transactionsList.filter(
          (t) =>
            (!filteredText ||
              t.productName.includes(filteredText) ||
              t.comment.includes(filteredText)) &&
            (!filteredPriceMin || t.productCost >= filteredPriceMin) &&
            (!filteredPriceMax || t.productCost <= filteredPriceMax) &&
            (!filteredDateFrom ||
              moment(t.date).format("YYYY-MM-DD") >=
                moment(filteredDateFrom).format("YYYY-MM-DD")) &&
            (!filteredDateTo ||
              moment(t.date).format("YYYY-MM-DD") <=
                moment(filteredDateTo).format("YYYY-MM-DD")) &&
            (!filteredIsIncome || t.isExpense === false) &&
            (!filtteredIsExpense || t.isExpense === true) &&
            (!filteredOwners ||
              filteredOwners.length === 0 ||
              filteredOwners.findIndex((f) => f._id === t.user._id) !== -1)
        );

        return tmpTransactions;
      };
      let tmp = filterTransactions(transactions);
      setFilteredTransactionsData(tmp);
    }
  }, [
    transactions,
    filteredText,
    filteredPriceMin,
    filteredPriceMax,
    filteredDateFrom,
    filteredDateTo,
    filteredOwners,
    filtteredIsExpense,
    filteredIsIncome,
  ]);

  const handleDownloadChart = () => {
    if (chartRef.current) {
      const imageUrl = chartRef.current.toBase64Image();
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "chart.png";
      link.click();
    }
  };

  const formatValue = (val) => {
    if (val === null || val === undefined) return "";
    if (typeof val === "object") {
      try {
        return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      } catch (e) {
        return '""';
      }
    }
    if (typeof val === "string") {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  const downloadCSV = (data, filename = "data.csv") => {
    if (!data || !data.length) {
      console.error("Brak danych do eksportu.");
      return;
    }

    const headersSet = new Set();
    data.forEach((obj) => {
      Object.keys(obj).forEach((key) => headersSet.add(key));
    });
    const headers = Array.from(headersSet);

    const csvRows = [];
    csvRows.push(headers.join(","));

    data.forEach((obj) => {
      const row = headers.map((header) => formatValue(obj[header]));
      csvRows.push(row.join(","));
    });

    const csvContent = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="transactions">
      <div className="transactions__wrapper">
        <div className="transactions__left">
          <div className="transactions__buttons">
            <div
              className={`transactions__amount ${
                defaultCategory
                  ? defaultCategory.currentAmount < 0
                    ? "red"
                    : defaultCategory.currentAmount >
                      defaultCategory.moneyLimit / 2
                    ? "green"
                    : ""
                  : budgetAmount > 0
                  ? "green"
                  : budgetAmount < 0
                  ? "red"
                  : ""
              }`}
            >
              <div className="transactions__amountIcon">
                <BsCash />
              </div>
              {defaultCategory ? defaultCategory.currentAmount : budgetAmount}
            </div>
            {viewChart ? (
              <div className="transactions__left">
                <button
                  className="customButton"
                  style={{ margin: 0 }}
                  onClick={() => {
                    setViewChart(false);
                  }}
                >
                  <BsArrowLeft />
                  Powrót do listy
                </button>
                <button
                  className="customButton"
                  onClick={() => {
                    handleDownloadChart();
                  }}
                >
                  <BsDownload /> Pobierz jako obrazek
                </button>
              </div>
            ) : (
              <div className="transactions__left">
                <button
                  className="customButton"
                  style={{ margin: 0 }}
                  onClick={() => {
                    setViewChart(true);
                  }}
                >
                  <BsBarChart /> Generuj wykres
                </button>
                <button
                  className="customButton"
                  onClick={() =>
                    downloadCSV(filteredTransactionsData, "data.csv")
                  }
                >
                  <BsDownload /> Pobierz podsumowanie
                </button>
              </div>
            )}
          </div>
          <div className="transactions__buttons">
            <button
              className="customButton"
              onClick={() => {
                setIsExpense(true);

                setOpenPopupToAdd(true);
              }}
            >
              Dodaj wydatek
            </button>
            <button
              className="customButton"
              onClick={() => {
                setIsExpense(false);
                setOpenPopupToAdd(true);
              }}
            >
              Dodaj przychód
            </button>
          </div>
        </div>
      </div>
      {deletedId ? (
        <DeleteTransaction
          setDeletedId={setDeletedId}
          deletedId={deletedId}
          onRemoveTransaction={deleteTransaction}
        />
      ) : (
        ""
      )}
      {openPopupToAdd ? (
        <AddNewTransaction
          setOpenPopupToAdd={setOpenPopupToAdd}
          onSubmitBehavior={addNew}
          budgetId={budgetId}
          user={user}
          isExpense={isExpense}
          categories={categories}
          defaultCategory={defaultCategory?._id}
        />
      ) : (
        ""
      )}
      {editingTransaction ? (
        <EditTransaction
          transaction={
            transactions[
              transactions.findIndex((t) => t._id === editingTransaction)
            ]
          }
          setOpenPopupToAdd={setEditingTransaction}
          onSubmitBehavior={editTransaction}
          user={user}
          categories={categories}
        />
      ) : (
        ""
      )}
      {viewChart ? (
        <ChartView
          transactions={filteredTransactionsData}
          categories={categories}
          chartRef={chartRef}
        />
      ) : (
        <div className="transactions__list">
          <div className="transactions__title">Transakcje</div>
          <TransactionFilters
            filteredText={filteredText}
            filteredPriceMin={filteredPriceMin}
            filteredPriceMax={filteredPriceMax}
            filteredDateFrom={filteredDateFrom}
            filteredDateTo={filteredDateTo}
            filteredOwners={filteredOwners}
            isIncome={filteredIsIncome}
            isExpense={filtteredIsExpense}
            setFilteredText={setFilteredText}
            setFilteredPriceMin={setFilteredPriceMin}
            setFilteredPriceMax={setFilteredPriceMax}
            setFilteredDateFrom={setFilteredDateFrom}
            setFilteredDateTo={setFilteredDateTo}
            setFilteredOwners={setFilteredOwners}
            setIsIncome={setFilteredIsIncome}
            setIsExpense={setFilteredIsExpense}
            usersList={usersList}
          />
          {filteredTransactionsData.length > 0 ? (
            filteredTransactionsData.map((transaction) => (
              <TransactionItem
                key={`transaction-${transaction.productName}-${transaction.date}-${transaction.productCost}`}
                transaction={transaction}
                setEditingTransaction={setEditingTransaction}
                setDeletedId={setDeletedId}
              />
            ))
          ) : (
            <div className="transactions__textNo">Brak transakcji</div>
          )}
        </div>
      )}
    </div>
  );
}
