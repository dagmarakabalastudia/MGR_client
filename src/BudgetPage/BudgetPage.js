import React, { useState, useEffect } from "react";
import "./BudgetPage.css";
import { useParams } from "react-router";
import axios from "axios";
import Participants from "./Participants/Participants";
import Transactions from "./Transactions/Transactions";
import { createAccountStore } from "../store/store";
import Categories from "./Categories/Categories";
import { useToast } from "../ToastComponent/ToastComponent";

import {
  BsAlarm,
  BsAirplaneFill,
  BsArrowThroughHeartFill,
  BsBackpack4,
  BsBagHeartFill,
  BsBasket2,
  BsBook,
  BsBoxSeam,
  BsCake2,
  BsCapsulePill,
  BsCarFrontFill,
  BsCameraFill,
  BsCash,
  BsController,
  BsCoin,
  BsEmojiAngry,
  BsEmojiNeutral,
  BsEmojiGrin,
  BsEmojiSmile,
  BsFillHouseFill,
  BsFillHeartFill,
  BsFillLuggageFill,
  BsFillPuzzleFill,
  BsFillTelephoneFill,
  BsFillTrophyFill,
  BsFillKeyFill,
} from "react-icons/bs";

export default function BudgetPage() {
  const user = createAccountStore((state) => state.user);
  const { addToast } = useToast();

  const { id } = useParams();
  const [userBudget, setUserBudget] = useState(undefined);
  const [budgetTransactions, setBudgetTransactions] = useState([]);
  const [filteredCategory, setCategoriesToFilter] = useState(null);
  const [budgetCategories, setBudgetCategories] = useState([]);

  const iconsList = [
    {
      value: "BsBagHeartFill",
      label: (
        <>
          <BsBagHeartFill />
        </>
      ),
    },
    {
      value: "BsBasket2",
      label: (
        <>
          <BsBasket2 />
        </>
      ),
    },
    {
      value: "BsBackpack4",
      label: (
        <>
          <BsBackpack4 />
        </>
      ),
    },
    {
      value: "BsBook",
      label: (
        <>
          <BsBook />
        </>
      ),
    },
    {
      value: "BsBoxSeam",
      label: (
        <>
          <BsBoxSeam />
        </>
      ),
    },
    {
      value: "BsCake2",
      label: (
        <>
          <BsCake2 />
        </>
      ),
    },
    {
      value: "BsAlarm",
      label: (
        <>
          <BsAlarm />
        </>
      ),
    },
    {
      value: "BsAirplaneFill",
      label: (
        <>
          <BsAirplaneFill />
        </>
      ),
    },
    {
      value: "BsArrowThroughHeartFill",
      label: (
        <>
          <BsArrowThroughHeartFill />
        </>
      ),
    },
    {
      value: "BsCapsulePill",
      label: (
        <>
          <BsCapsulePill />
        </>
      ),
    },
    {
      value: "BsCarFrontFill",
      label: (
        <>
          <BsCarFrontFill />
        </>
      ),
    },
    {
      value: "BsCameraFill",
      label: (
        <>
          <BsCameraFill />
        </>
      ),
    },
    {
      value: "BsCash",
      label: (
        <>
          <BsCash />
        </>
      ),
    },
    {
      value: "BsController",
      label: (
        <>
          <BsController />
        </>
      ),
    },
    {
      value: "BsCoin",
      label: (
        <>
          <BsCoin />
        </>
      ),
    },
    {
      value: "BsEmojiAngry",
      label: (
        <>
          <BsEmojiAngry />
        </>
      ),
    },
    {
      value: "BsEmojiNeutral",
      label: (
        <>
          <BsEmojiNeutral />
        </>
      ),
    },
    {
      value: "BsEmojiGrin",
      label: (
        <>
          <BsEmojiGrin />
        </>
      ),
    },
    {
      value: "BsEmojiSmile",
      label: (
        <>
          <BsEmojiSmile />
        </>
      ),
    },
    {
      value: "BsFillHouseFill",
      label: (
        <>
          <BsFillHouseFill />
        </>
      ),
    },
    {
      value: "BsFillHeartFill",
      label: (
        <>
          <BsFillHeartFill />
        </>
      ),
    },
    {
      value: "BsFillLuggageFill",
      label: (
        <>
          <BsFillLuggageFill />
        </>
      ),
    },
    {
      value: "BsFillPuzzleFill",
      label: (
        <>
          <BsFillPuzzleFill />
        </>
      ),
    },
    {
      value: "BsFillTelephoneFill",
      label: (
        <>
          <BsFillTelephoneFill />
        </>
      ),
    },
    {
      value: "BsFillTrophyFill",
      label: (
        <>
          <BsFillTrophyFill />
        </>
      ),
    },
    {
      value: "BsFillKeyFill",
      label: (
        <>
          <BsFillKeyFill />
        </>
      ),
    },
  ];

  useEffect(() => {
    if (id) {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "budgets/" + id)
        .then((response) => {
          setUserBudget(response.data.budget);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setUserBudget(undefined);
          addToast("Wystąpił błąd", "error");
        });
      axios
        .get(process.env.REACT_APP_SERVER_URL + "transactions/budget/" + id)
        .then((response) => {
          setBudgetTransactions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setBudgetTransactions([]);
          addToast("Wystąpił błąd", "error");
        });
      axios
        .get(process.env.REACT_APP_SERVER_URL + "categories/budget/" + id)
        .then((response) => {
          setBudgetCategories(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setBudgetCategories([]);
          addToast("Wystąpił błąd", "error");
        });
    }
  }, [id, addToast]);

  const addParticipant = (userEmail) => {
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "budgets/" + id + "/participants",
        { userEmail: userEmail }
      )
      .then(() => {
        addToast("Uczestnik dodany", "success");

        axios
          .get(process.env.REACT_APP_SERVER_URL + "budgets/" + id)
          .then((response) => {
            setUserBudget(response.data.budget);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setUserBudget(undefined);
            addToast("Wystąpił błąd", "error");
          });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        addToast(
          error?.response?.data.message
            ? error?.response?.data.message
            : "Wystąpił błąd",
          "error"
        );
      });
  };
  const addNewTransaction = (transaction) => {
    axios
      .post(process.env.REACT_APP_SERVER_URL + "transactions", transaction)
      .then(() => {
        addToast("Transakcja dodana", "success");

        axios
          .get(process.env.REACT_APP_SERVER_URL + "transactions/budget/" + id)
          .then((response) => {
            setBudgetTransactions(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setBudgetTransactions([]);
            addToast("Wystąpił błąd", "error");
          });
        axios
          .get(process.env.REACT_APP_SERVER_URL + "budgets/" + id)
          .then((response) => {
            setUserBudget(response.data.budget);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setUserBudget(undefined);
            addToast("Wystąpił błąd", "error");
          });
        axios
          .get(process.env.REACT_APP_SERVER_URL + "categories/budget/" + id)
          .then((response) => {
            setBudgetCategories(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setBudgetCategories([]);
            addToast("Wystąpił błąd", "error");
          });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        addToast("Wystąpił błąd", "error");
      });
  };
  const addNewCategory = (category) => {
    axios
      .post(process.env.REACT_APP_SERVER_URL + "categories", {
        ...category,
        currentAmount: category.moneyLimit,
      })
      .then(() => {
        addToast("Kategoria dodana", "success");

        axios
          .get(process.env.REACT_APP_SERVER_URL + "categories/budget/" + id)
          .then((response) => {
            setBudgetCategories(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setBudgetCategories([]);
            addToast("Wystąpił błąd", "error");
          });
        axios
          .get(process.env.REACT_APP_SERVER_URL + "categories/budget/" + id)
          .then((response) => {
            setBudgetCategories(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setBudgetCategories([]);
            addToast("Wystąpił błąd", "error");
          });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        addToast("Wystąpił błąd", "error");
      });
  };
  const deleteTransaction = (transactionId) => {
    axios
      .delete(
        process.env.REACT_APP_SERVER_URL + "transactions/" + transactionId
      )
      .then(() => {
        addToast("Transakcja usunięta", "success");

        axios
          .get(process.env.REACT_APP_SERVER_URL + "transactions/budget/" + id)
          .then((response) => {
            setBudgetTransactions(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setBudgetTransactions([]);
            addToast("Wystąpił błąd", "error");
          });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        addToast("Wystąpił błąd", "error");
      });
  };
  const editTransaction = (transaction) => {
    axios
      .put(
        process.env.REACT_APP_SERVER_URL + "transactions/" + transaction._id,
        transaction
      )
      .then(() => {
        addToast("Transakcja zedytowana", "success");
        axios
          .get(process.env.REACT_APP_SERVER_URL + "transactions/budget/" + id)
          .then((response) => {
            setBudgetTransactions(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setBudgetTransactions([]);
            addToast("Wystąpił błąd", "error");
          });
        axios
          .get(process.env.REACT_APP_SERVER_URL + "categories/budget/" + id)
          .then((response) => {
            setBudgetCategories(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setBudgetCategories([]);
            addToast("Wystąpił błąd", "error");
          });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        addToast("Wystąpił błąd", "error");
      });
  };
  const removeParticipant = (participantId) => {
    axios
      .put(
        process.env.REACT_APP_SERVER_URL +
          "budgets/" +
          id +
          "/participants/remove",
        { participantId: participantId }
      )
      .then(() => {
        axios
          .get(process.env.REACT_APP_SERVER_URL + "budgets/" + id)
          .then((response) => {
            setUserBudget(response.data.budget);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            setUserBudget(undefined);
            addToast("Wystąpił błąd", "error");
          });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        addToast("Wystąpił błąd", "error");
      });
  };

  return (
    <div className="budgetPage">
      <div className="budgetPage__container">
        {userBudget ? (
          <>
            <div className="budgetPage__left">
              <h1 className="budgetPage__title"> {userBudget?.name}</h1>

              <Categories
                setCategoriesToFilter={setCategoriesToFilter}
                filteredCategory={filteredCategory}
                addNew={addNewCategory}
                budgetId={id}
                categories={budgetCategories}
                iconsList={iconsList}
              />

              <Transactions
                editTransaction={editTransaction}
                transactions={budgetTransactions.filter(
                  (t) =>
                    !filteredCategory || filteredCategory === t.category._id
                )}
                addNew={addNewTransaction}
                budgetId={id}
                usersList={[userBudget.owner, ...userBudget.participants]}
                defaultCategory={
                  budgetCategories[
                    budgetCategories.findIndex(
                      (c) => c._id === filteredCategory
                    )
                  ]
                }
                deleteTransaction={deleteTransaction}
                user={user.id}
                budgetAmount={userBudget?.totalAmount}
                categories={budgetCategories}
              />
            </div>
            <div className="budgetPage__right">
              <Participants
                participants={userBudget?.participants}
                addNew={addParticipant}
                onRemoveParticipant={removeParticipant}
                isOwner={userBudget?.owner._id === user?.id}
              />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
