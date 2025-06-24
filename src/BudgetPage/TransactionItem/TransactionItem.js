import React, { useState } from "react";
import "./TransactionItem.css";
import { BsTrash, BsPencil, BsInfoCircle } from "react-icons/bs";
import moment from "moment";
import * as BsIcons from "react-icons/bs";
export default function TransactionItem({
  transaction,
  setEditingTransaction,
  setDeletedId,
}) {
  const Icon = BsIcons[transaction?.category?.icon];
  const [positionTooltip, setPositionTooltip] = useState(-1);
  return (
    <div className="transactionItem">
      <div className="transactionItem__left">
        <div
          className="transactionItem__category"
          style={{
            color: transaction?.category?.color
              ? `${transaction?.category?.color}`
              : "inherit",
            borderColor: transaction?.category?.color
              ? `${transaction?.category?.color}`
              : "#5c0855",
            backgroundColor: transaction?.category?.color
              ? `${transaction?.category?.color}42`
              : "#5c085542",
          }}
        >
          {Icon ? (
            <Icon />
          ) : transaction?.category?.name ? (
            transaction?.category.name[0]
          ) : (
            ""
          )}
        </div>
        {transaction.productName} {transaction.isExpense ? "-" : "+"}{" "}
        {transaction.productCost} zł
        <div
          className="transactionItem__info"
          onMouseOut={() => setPositionTooltip(-1)}
          onMouseOver={(e) => {
            setPositionTooltip(e.pageX - 24);
          }}
        >
          <BsInfoCircle />
        </div>
      </div>
      <div className="transactionItem__right">
        <button
          className="transactionItem__icon"
          onClick={() => setEditingTransaction(transaction._id)}
        >
          <BsPencil />
        </button>
        <button
          className="transactionItem__icon"
          onClick={() => setDeletedId(transaction._id)}
        >
          <BsTrash />
        </button>
      </div>
      {positionTooltip >= 0 ? (
        <div
          className="transactionItem__tooltip"
          style={{
            left: `${positionTooltip}px`,
            maxWidth: `${2 * positionTooltip}px`,
          }}
        >
          <div className="transactionItem__content">
            {transaction.productName} {transaction.isExpense ? "-" : "+"}{" "}
            {transaction.productCost} zł - {transaction.category?.name}
            <br />
            {transaction.comment}
            <br />
            {moment(transaction.date).format("DD.MM.YYYY")}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
