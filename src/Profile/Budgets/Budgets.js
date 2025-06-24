import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Budgets.css";
import BudgetPopup from "../BudgetPopup/BudgetPopup";
import { createAccountStore } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import DeleteBudget from "../../BudgetPage/DeleteParticipant/DeleteBudget";
import { useToast } from "../../ToastComponent/ToastComponent";
export default function Budgets() {
  const user = createAccountStore((state) => state.user);
  const [userBudgets, setUserBudgets] = useState([]);
  const [openPopupToAdd, setOpenPopupToAdd] = useState(false);
  const navigate = useNavigate();
  const [deletedId, setDeletedId] = useState();
  const { addToast } = useToast();
  const deleteBudget = (transactionId) => {
    axios
      .delete(process.env.REACT_APP_SERVER_URL + "budgets/" + transactionId)
      .then(() => {
        addToast("Budżet usunięto", "success");

        axios
          .get(process.env.REACT_APP_SERVER_URL + "budgets", {
            params: { userId: user.id },
          })
          .then((response) => {
            setUserBudgets(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setUserBudgets([]);
          });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        addToast("Wystąpił błąd", "error");
      });
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "budgets", {
        params: { userId: user.id },
      })
      .then((response) => {
        setUserBudgets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUserBudgets([]);
      });
  }, [user]);

  const onSubmitBehavior = (values) => {
    axios
      .post(process.env.REACT_APP_SERVER_URL + "budgets", values)
      .then((response1) => {
        axios
          .get(process.env.REACT_APP_SERVER_URL + "budgets", {
            params: { userId: user.id },
          })
          .then((response) => {
            setUserBudgets(response.data);
            setOpenPopupToAdd(false);
            navigate(`/budget/${response1.data._id}`);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setUserBudgets([]);
          });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  return (
    <div className="budgets">
      <div className="budgets__list">
        {userBudgets.map((budget) => (
          <div
            className="budgets__itemWrap"
            key={`budget-${user.id}-${budget.name}`}
          >
            <Link className="budgets__item" to={`/budget/${budget._id}`}>
              {budget.name}
            </Link>
            <button
              className="transactionItem__icon"
              onClick={() => setDeletedId(budget._id)}
            >
              <BsTrash />
            </button>
          </div>
        ))}
      </div>
      {openPopupToAdd ? (
        <BudgetPopup
          setOpenPopupToAdd={setOpenPopupToAdd}
          onSubmitBehavior={onSubmitBehavior}
          user={user}
        />
      ) : (
        ""
      )}
      {deletedId ? (
        <DeleteBudget
          setDeletedId={setDeletedId}
          deletedId={deletedId}
          onRemoveBudget={deleteBudget}
        />
      ) : (
        ""
      )}
      <button className="customButton" onClick={() => setOpenPopupToAdd(true)}>
        Dodaj nowy budżet
      </button>
    </div>
  );
}
