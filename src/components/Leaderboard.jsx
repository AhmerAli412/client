import React, { useState, useEffect } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import "./Leaderboard.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Leaderboard() {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [sortColumn, setSortColumn] = useState("userId");

  useEffect(() => {
    fetch('https://inceptia.onrender.com/fetchUsers')
      .then(response => response.json())
      .then(data => {
        const modifiedData = data.map((row, index) => ({ ...row, id: index }));
        setData(modifiedData);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSort = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedData = [...data].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (sortOrder === "asc") {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  });

  const columns = ["userId", "firstName", "lastName", "erc20Balance", "metamaskAddress"];

  return (
    <>
      <Navbar />
      <div className="leaderboard-container">
      <div className="flex items-center rounded-sm mb-4">
          <label htmlFor="sortColumn" className="mr-2">Sort By:</label>
          <select
            id="sortColumn"
            onChange={(e) => handleSort(e.target.value)}
            value={sortColumn}
            className="border p-1 mr-2 rounded-lg"
          >
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))}
            className="border p-1"
          >
            {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>erc20Balance</th>
              <th>Metamask address</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((rowData) => (
              <tr key={rowData.userId}>
                <td>{rowData.userId}</td>
                <td>{rowData.firstName}</td>
                <td>{rowData.lastName}</td>
                <td>{rowData.erc20Balance}</td>
                <td>{rowData.metamaskAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default Leaderboard;
