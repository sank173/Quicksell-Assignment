import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import './KabanBoard.css';
import { groupTickets, sortTickets } from '../utils/ticketUtils';

const KanbanBoard = ({ tickets, grouping, sorting, onGroupingChange, onSortingChange, users }) => {
    const [isDisplayVisible, setIsDisplayVisible] = useState(false);

    if (!Array.isArray(tickets)) {
        return <div>Loading tickets...</div>;
    }

    const handleGroupingChange = (value) => {
        setIsDisplayVisible(false); 
        onGroupingChange(value);   
    };

    const handleSortingChange = (value) => {
        setIsDisplayVisible(false); 
        onSortingChange(value);    
    };

    const groupedTickets = groupTickets(tickets, grouping);
    const sortedGroups = Object.entries(groupedTickets).map(([key, group]) => ({
        key,
        tickets: sortTickets(group, sorting),
    }));

    return (
        <div>
            <div className="display-container">
                <button
                    className="display-button"
                    onClick={() => setIsDisplayVisible(!isDisplayVisible)}
                >
                    <span className="button-icon">
                        <img
                            src={`/Assets/icons_FEtask/Display.svg`}
                            alt="display-icon"
                        />
                    </span>
                    <span>Display</span>
                    <span className="button-icon">
                        <img
                            src={`/Assets/icons_FEtask/down.svg`}
                            alt="down-icon"
                        />
                    </span>
                </button>

                {isDisplayVisible && (
                    <div className="dropdown-box">
                        <div>
                            <label>Grouping:</label>
                            <select value={grouping} onChange={(e) => handleGroupingChange(e.target.value)}>
                                <option value="status">Status</option>
                                <option value="userId">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </div>

                        <div>
                            <label>Ordering:</label>
                            <select value={sorting} onChange={(e) => handleSortingChange(e.target.value)}>
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="kanban-board">
                {sortedGroups.map(({ key, tickets }) => (
                    <KanbanColumn key={key} title={key} tickets={tickets} users={users} grouping={grouping} />
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
