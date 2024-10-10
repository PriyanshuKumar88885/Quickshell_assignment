import React from "react";

const TicketColumn = ({ title, tickets, users, sortBy }) => {
  const PRIORITY_KEYS = ["No priority", "Low", "Medium", "High", "Urgent"];

  const getInitials = (name) => {
    const nameParts = name.split(" ");
    return nameParts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const sortTickets = (tickets, sortBy) => {
    return tickets.sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority; // Descending order of priority
      } else if (sortBy === "title") {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      return 0;
    });
  };

  const sortedTickets = sortTickets([...tickets], sortBy);

  return (
    <div className="ticket-column">
      <h3>{title}</h3>
      <div className="ticket-list">
        {sortedTickets.map((ticket) => {
          const user = users.find((user) => user.id === ticket.userId);
          return (
            <div key={ticket.id} className="ticket">
              <div className="ticket-header">
                <div className="user-icon">
                  {user ? getInitials(user.name) : "?"}
                </div>
                <strong>ID: {ticket.id}</strong>
              </div>
              <p className="ticket-title">{ticket.title}</p>
              <span className={`priority-tag priority-${ticket.priority}`}>
                {PRIORITY_KEYS[ticket.priority]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketColumn;
