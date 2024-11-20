import React, { useEffect, useState } from 'react';
import { fetchTickets } from './services/api';
import KanbanBoard from './components/KanbanBoard';
import './App.css'

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(() => localStorage.getItem('sorting') || 'priority');
  const loadTickets = async () => {
    const data = await fetchTickets();
    console.log(data);
    setTickets(data.tickets);
    setUsers(data.users);
  };
  useEffect(() => {
   
    loadTickets();
  }, []);
  useEffect(() => {
    console.log("Updated tickets:", tickets);
    console.log("User:", users);
  }, [tickets,users]);
  

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sorting', sorting);
  }, [grouping, sorting]);

  return (
    <div>
      
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        sorting={sorting}
        onGroupingChange={setGrouping}
        onSortingChange={setSorting}
      />
    </div>
  );
}

export default App;
