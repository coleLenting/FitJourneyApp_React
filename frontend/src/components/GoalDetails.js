import { useState } from 'react';
import { useGoalsContext } from '../hooks/useGoalscontext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const GoalDetails = ({ goal }) => {
    const { dispatch } = useGoalsContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedGoal, setEditedGoal] = useState({
        goalName: goal.goalName,
        goalDescription: goal.goalDescription,
        goalTimeframe: goal.goalTimeframe
    });

    const handleClick = async () => {
        const response = await fetch('api/goals/' + goal._id, {
            method: 'DELETE'
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_GOAL', payload: json });
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const response = await fetch('api/goals/' + goal._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedGoal),
        });
        const json = await response.json();

        console.log('Updated goal:', json); 
    
        if (response.ok) {
            dispatch({ type: 'EDIT_GOAL', payload: json }); // Dispatch the edit action
            setIsEditing(false);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedGoal({ ...editedGoal, [name]: value });
    };

    return (
            <div className="goal-details">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="goalName"
                            value={editedGoal.goalName}
                            onChange={handleChange}
                        />
                        <textarea
                            name="goalDescription"
                            value={editedGoal.goalDescription}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="goalTimeframe"
                            value={editedGoal.goalTimeframe}
                            onChange={handleChange}
                        />
                        <button onClick={handleSaveClick}>Save</button>
                    </>
                ) : (
                    <>
                        <h4>{goal.goalName}</h4>
                        <p><strong>Goal Description: </strong>{goal.goalDescription}</p>
                        <p><strong>Goal Timeframe in days: </strong>{goal.goalTimeframe}</p>
                        <p>{formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}</p>
                        <button className='material-symbols-outlined' onClick={handleEditClick}>Edit</button>
                    </>
                )}
                <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
            </div>
    );
};

export default GoalDetails;