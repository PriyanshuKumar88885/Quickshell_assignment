import React, { useState, useEffect } from "react";
import "./App.css";
import { BiAbacus, BiChevronDown } from "react-icons/bi";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grouping, setGrouping] = useState("status"); // Default grouping: 'status'
  const [sorting, setSorting] = useState("priority"); // Default sorting: 'priority'
  const [popupVisible, setPopupVisible] = useState(false); // To toggle popup

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch tickets");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading tickets...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="app-container">
      <div className="header">
        <button onClick={togglePopup} className="controls">
          <BiChevronDown className="icon" />
          <BiAbacus className="icon" />
          <span>Display Options</span>
        </button>
      </div>

      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-grouping">
              <span>Group by:</span>
              <select
                onChange={(e) => setGrouping(e.target.value)}
                value={grouping}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="popup-sorting">
              <span>Sort by:</span>
              <select
                onChange={(e) => setSorting(e.target.value)}
                value={sorting}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard">
        <Dashboard
          tickets={tickets}
          groupBy={grouping}
          users={users}
          sortBy={sorting}
        />
      </div>
    </div>
  );
};

export default App;
