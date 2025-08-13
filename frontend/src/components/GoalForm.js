import { useState } from "react";
import { useGoalsContext } from '../hooks/useGoalscontext';
import 'bootstrap/dist/css/bootstrap.css';

const GoalForm = ({onAddGoal}) => {
    const { dispatch } = useGoalsContext();

    const [goalName, setGoalName] = useState('');
    const [goalDescription, setGoalDescription] = useState('');
    const [goalTimeframe, setGoalTimeframe] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const goal = { goalName, goalDescription, goalTimeframe };

        try {
            const response = await fetch('/api/goals', {
                method: 'POST',
                body: JSON.stringify(goal),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();

            if (!response.ok) {
                // Check if the server response contains the expected fields
                if (json.error) {
                    setError(json.error);
                } else {
                    setError('Please fill in all fields');
                }
                if (json.emptyFields) {
                    setEmptyFields(json.emptyFields);
                } else {
                    setEmptyFields([]);
                }
            } else {
                // Clear the form and reset error states if the request was successful
                setGoalName('');
                setGoalDescription('');
                setGoalTimeframe('');
                setError(null);
                setEmptyFields([]);
                console.log('New goal added:', json);
                dispatch({ type: 'CREATE_GOAL', payload: json });
                onAddGoal();
            }
        } catch (err) {
            // Catch any network errors or unexpected issues
            setError('Failed to connect to the server. Please try again later.');
            setEmptyFields([]);
            console.error('Request failed:', err);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3 className="mb-4">Start your fitness journey with a single goal!</h3>

            <div className="mb-3">
                <label className="form-label">Goal Name</label>
                <input
                    type="text"
                    onChange={(e) => setGoalName(e.target.value)}
                    value={goalName}
                    className={`form-control ${emptyFields.includes('goalName') ? 'is-invalid' : ''}`}
                    placeholder="(e.g. Project 50)"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Goal Description</label>
                <input
                    type="text"
                    onChange={(e) => setGoalDescription(e.target.value)}
                    value={goalDescription}
                    className={`form-control ${emptyFields.includes('goalDescription') ? 'is-invalid' : ''}`}
                    placeholder="describe what you really want to achieve, be descriptive....."
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Goal Timeframe (days)</label>
                <input
                    type="number"
                    onChange={(e) => setGoalTimeframe(e.target.value)}
                    value={goalTimeframe}
                    className={`form-control ${emptyFields.includes('goalTimeframe') ? 'is-invalid' : ''}`}
                />
            </div>

            <button className="btn btn-primary">Add Goal</button>

            {/* Display the error message */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
    );
};

export default GoalForm;