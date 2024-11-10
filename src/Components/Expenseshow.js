import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useTable } from "react-table";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles.css";

// const foldOutAnimation = keyframes`
//   0% { transform: scale(1); }
//   100% { transform: scale(1.05); }
// `;

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

const DataTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="table">
      {" "}
      <thead>
        {" "}
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {" "}
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}{" "}
          </tr>
        ))}{" "}
      </thead>{" "}
      <tbody {...getTableBodyProps()}>
        {" "}
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {" "}
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}{" "}
            </tr>
          );
        })}{" "}
      </tbody>{" "}
    </table>
  );
};

export const ExpenseShow = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const columns = React.useMemo(
    () => [
      { Header: "Category", accessor: "type" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Date", accessor: "date" },
    ],
    []
  );

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handleSearch = () => {
    if (startDate && endDate) {
      axios
        .get(
          `http://localhost:5156/api/Expense/ExpenseSearch?FromDate=${startDate}&ToDate=${endDate}&UserId=${userId}`
        )
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: "5%",
        marginX: "5%",
        backgroundColor: "#f0f8ff",
        padding: "2%",
      }}
    >
      <Typography
        data-aos="fade-down"
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        Daily Expense Tracker
      </Typography>
      <Box
        sx={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}
      >
        <TextField
          label="From Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: "10px" }}
        />
        <TextField
          label="To Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ marginLeft: "10px" }}
        >
          Search
        </Button>
      </Box>
      {data.length > 0 && <DataTable columns={columns} data={data} />}
    </Box>
  );
};

export default ExpenseShow;
