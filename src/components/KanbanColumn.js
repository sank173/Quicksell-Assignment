import React from 'react';
import './KabanColumn.css';

const KanbanColumn = ({ title, tickets, grouping, users }) => {
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return { label: "Low Priority", icon: "Img - Low Priority.svg" };  
      case 2:
        return { label: "Medium Priority", icon: "Img - Medium Priority.svg" };  
      case 3:
        return { label: "High Priority", icon: "Img - High Priority.svg" };  
      case 4:
        return { label: "Urgent", icon: "SVG - Urgent Priority colour.svg"};   
      default:
        return { label: "No Priority", icon: "No-priority.svg" };  
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Todo':
        return { label: "Todo", icon: "To-do.svg" }; 
      case 'Backlog':
        return { label: "Backlog", icon: "Backlog.svg" };  
      case 'In progress':
        return { label: "In progress", icon: "in-progress.svg" };  
      default:
        return { label: "Done Status", icon: "Done.svg" }; 
    }
  };

//   const getUserName = (userId) => {
//     const user = users.find((user) => user.id === userId);
//     return user ? <div>
//     <span> {user.name}</span></div> : "Unknown User";  // Return "Unknown User" if user not found
//   };
const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    const initials = user ? user.name.slice(0, 2).toUpperCase() : "UU";

    
    const randomHSL = () => {
        const hue = Math.floor(Math.random() * 360); 
        const saturation = Math.floor(Math.random() * 31) + 40; 
        const lightness = Math.floor(Math.random() * 21) + 40; 
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const backgroundColor = randomHSL();

    return (
        <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
                className="user-circle"
                style={{
                    backgroundColor,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '14px',
                }}
            >
                <span>{initials}</span>
            </div>
            <span style={{ fontSize: '14px', color: '#333' }}>{user ? user.name : "Unknown User"}</span>
        </div>
    );
};




  return (
    <div>
      <div className='kanban-column-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="kanban-column-title" style={{ display: 'flex', alignItems: 'center' }}>
          {grouping === 'priority' ? (
            <>
              <span>{getPriorityLabel(Number(title)).label}</span>
              <span>  </span>
              <img
                src={`/Assets/icons_FEtask/${getPriorityLabel(Number(title)).icon}`} 
                style={{ width: '20px', height: '20px',margin: '5px' }} 
              />
            </>
          ) : grouping === 'status' ? (
            <>
              <span>{getStatusLabel(title).label}</span>
              <span>  </span>
              <img
                src={`/Assets/icons_FEtask/${getStatusLabel(title).icon}`} 
                style={{ width: '20px', height: '20px',margin: '5px' }} 
              />
            </>
          ) : grouping === 'userId' ? getUserName(title) : title}
          <span style={{ marginLeft: '10px', fontSize: '14px', color: '#888' }}>
            {tickets.length}
          </span>
        </h2>

        <div className="ic" style={{ display: 'flex', gap: '0px' }}>
          <span style={{ fontSize: '14px', color: '#888' }}>
            <img
              src={`/Assets/icons_FEtask/add.svg`} 
              style={{ width: '15px', height: '15px' }} 
            />
          </span>
          <span style={{ fontSize: '14px', color: '#888' }}>
            <img
              src={`/Assets/icons_FEtask/3 dot menu.svg`} 
              style={{ width: '15px', height: '15px' }} 
            />
          </span>
        </div>
      </div>

      {tickets.map((ticket) => (
        <div key={ticket.id} className="kanban-card">
          {/* Ticket ID */}
          <div className="kanban-card-id">{ticket.id}</div>
          <div className="kanban-card-circle-image">
            {/* Placeholder image, replace with an actual URL if you have one */}
            <img
              src="https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720"
              alt="placeholder"
            />
          </div>

          {/* Ticket Title */}
          <div className="kanban-card-title">
          <img
                src={`/Assets/icons_FEtask/${getStatusLabel(ticket.status).icon}`} 
                style={{ width: '15px', height: '15px' }} 
              />
           <span style={{ marginLeft: '10px'}}> {ticket.title}</span>
          </div>

          {/* Ticket Type */}
          <div className="kanban-card-type">
          <img
                src={`/Assets/icons_FEtask/${getPriorityLabel(Number(ticket.priority)).icon}`} 
                style={{ width: '15px', height: '15px',marginTop: '10px' }} 
              />

          <span style={{ marginLeft: '10px', fontSize: '14px', color: '#888' }}>{ticket.tag[0] || "Unknown"}</span></div>
        </div>
      ))}
    </div>
  );
};

export default KanbanColumn;
