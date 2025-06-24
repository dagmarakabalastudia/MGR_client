import React, { useEffect, useState } from "react";
import "./ChartView.css";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import moment from "moment";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartDataLabels
);
export default function ChartView({ chartRef, transactions, categories }) {
  const [chartType, setChartType] = useState("bar");
  const [generateChart, setGenerateChart] = useState(false);
  const [categorySums, setCategoriesSums] = useState([]);
  const [categoryMonthSums, setCategoriesMonthSums] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);
  const [timeStart, setTimeStart] = useState(undefined);
  const [timeEnd, setTimeEnd] = useState(undefined);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "white",
        formatter: (value, context) => {
          return value > 0
            ? context.chart.data.labels[context.dataIndex] +
                "- " +
                value +
                " zł"
            : "";
        },

        padding: 6,
      },
    },
  };
  const optionsScales = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "white",
        formatter: (value, context) => {
          return value > 0 ? value + " zł" : "";
        },

        padding: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + " zł";
          },
        },
      },
    },
  };
  const dataSet = {
    labels: categorySums.map((item) => item.categoryName),
    datasets: [
      {
        label: "Wydatki",
        data: categorySums.map((item) => item.totalExpense),
        backgroundColor: categorySums.map((item) => item.color),
        borderColor: categorySums.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    if (transactions && categories) {
      const newCategoriesSums = categories.map((category) => {
        const total = transactions
          .filter(
            (transaction) =>
              transaction.category._id === category._id && transaction.isExpense
          )
          .reduce((sum, transaction) => sum + transaction.productCost, 0);
        return {
          categoryName: category.name,
          totalExpense: total,
          color: category.color,
          icon: category.icon,
        };
      });
      const start = moment(timeStart, "YYYY-MM");
      const end = moment(timeEnd, "YYYY-MM");

      let monthLabelsTmp = [];
      for (
        let m = start;
        m.isBefore(end) || m.isSame(end, "month");
        m.add(1, "month")
      ) {
        monthLabelsTmp.push(m.format("MMMM YYYY"));
      }
      const newCategoriesMonthSums = categories.map((category) => {
        const monthlyData = monthLabelsTmp.map((monthLabel) => {
          const month = moment(monthLabel, "MMMM YYYY");
          return transactions
            .filter((transaction) => {
              const transactionDate = moment(transaction.date);
              return (
                transaction.category._id === category._id &&
                transaction.isExpense &&
                transactionDate.isSame(month, "month") &&
                transactionDate.year() === month.year() &&
                transactionDate.month() === month.month()
              );
            })
            .reduce((sum, transaction) => sum + transaction.productCost, 0);
        });
        return {
          categoryName: category.name,
          monthlyData,
          color: category.color,
        };
      });
      setMonthLabels(monthLabelsTmp);
      setCategoriesSums(newCategoriesSums);
      setCategoriesMonthSums(newCategoriesMonthSums);
    }
  }, [transactions, categories, timeStart, timeEnd]);
  const renderChart = {
    bar: <Bar ref={chartRef} data={dataSet} options={optionsScales} />,
    pie: <Pie ref={chartRef} data={dataSet} options={options} />,
    doughnut: <Doughnut ref={chartRef} data={dataSet} options={options} />,
    line: (
      <Line
        ref={chartRef}
        options={optionsScales}
        data={{
          labels: monthLabels,
          datasets: categoryMonthSums.map((item) => ({
            label: item.categoryName,
            data: item.monthlyData,
            fill: false,
            borderColor: item.color,
            tension: 0.1,
          })),
        }}
      />
    ),
  };
  return (
    <div className="chartView">
      {generateChart ? (
        <div className="chartView__config">
          <div className="chartView__content">
            <div className="chartView__chart">{renderChart[chartType]}</div>
          </div>
        </div>
      ) : (
        <div className="chartView__config">
          <div className="chartView__title">Skonfiguruj:</div>
          <div className="chartView__content">
            <div className="chartView__type">
              <div className="customFormElement center">
                <label htmlFor="bar">Słupkowy</label>
                <input
                  name="chartType"
                  type="radio"
                  id="bar"
                  value="bar"
                  className="customInput"
                  checked={chartType === "bar"}
                  onChange={(e) => {
                    setChartType("bar");
                  }}
                />
              </div>
              <div className="customFormElement center">
                <label htmlFor="pie">Kołowy</label>
                <input
                  name="chartType"
                  type="radio"
                  id="pie"
                  value="pie"
                  className="customInput"
                  checked={chartType === "pie"}
                  onChange={(e) => {
                    setChartType("pie");
                  }}
                />
              </div>
              <div className="customFormElement center">
                <label htmlFor="doughnut">Donut</label>
                <input
                  name="chartType"
                  type="radio"
                  id="doughnut"
                  value="doughnut"
                  className="customInput"
                  checked={chartType === "doughnut"}
                  onChange={(e) => {
                    setChartType("doughnut");
                  }}
                />
              </div>
              <div className="customFormElement center">
                <label htmlFor="line">Liniowy</label>
                <input
                  name="chartType"
                  type="radio"
                  value="line"
                  id="line"
                  className="customInput"
                  checked={chartType === "line"}
                  onChange={(e) => {
                    setChartType("line");
                  }}
                />
              </div>

              <button
                className="customButton"
                onClick={() => {
                  if (chartType === "line") {
                    if (timeStart && timeEnd) {
                      setGenerateChart(true);
                    }
                  } else {
                    setGenerateChart(true);
                  }
                }}
              >
                Generuj
              </button>
            </div>
            {chartType === "line" ? (
              <div className="chartView__type">
                <div className="customFormElement center">
                  <label htmlFor="timeStart">Przedział od:</label>
                  <input
                    type="month"
                    name="timeStart"
                    className="customInput"
                    value={timeStart || undefined}
                    onChange={(e) => setTimeStart(e.target.value)}
                  />
                </div>
                <div className="customFormElement center">
                  <label htmlFor="timeEnd">Przedział do:</label>
                  <input
                    type="month"
                    name="timeEnd"
                    className="customInput"
                    value={timeEnd || undefined}
                    onChange={(e) => setTimeEnd(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
}
