import React from 'react'
import TicketColumn from './TicketColumn';
const dashboard = ({tickets,groupBy,users,sortBy}) => {

    const STATUS_KEYS = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
    const PRIORITY_KEYS = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];

    let columns = [];

  console.log(users)
  if (groupBy === 'status') {
    columns = STATUS_KEYS.map(status => ({
      key: status,
      tickets: tickets.filter(ticket => ticket.status === status),
    }));
  } else if (groupBy === 'priority') {
    columns = PRIORITY_KEYS.map((priority,index) => ({
      key: PRIORITY_KEYS[index],
      tickets: tickets.filter(ticket => ticket.priority === index),
    }));
  } else if (groupBy === 'user') {
    const userIds = users.map(user=>user.id) 
    columns = userIds.map(userId => ({
      key: users.find((user)=>userId==user.id).name,
      tickets: tickets.filter(ticket => ticket.userId === userId),
    }));
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {columns.map(column => (
      <TicketColumn key={column.key} title={column.key} tickets={column.tickets} users={users} sortBy={sortBy}/>
    ))}
  </div>
  )
}

export default dashboard