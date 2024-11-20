export const groupTickets = (tickets, grouping) => {
    const groups = {};
    tickets.forEach(ticket => {
      
      const key = ticket[grouping] || 'Unassigned';
      
      if (!groups[key]) groups[key] = [];
      groups[key].push(ticket);
    });
    return groups;
  };
  
  export const sortTickets = (tickets, sorting) => {
    if (sorting === 'priority') {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    }
    if (sorting === 'title') {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };
  