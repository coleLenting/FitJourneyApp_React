import { useEffect} from 'react'
import React, { useState } from 'react';
import { useGoalsContext } from '../hooks/useGoalscontext'
import PopUp from '../components/popUp';

// components
import GoalDetails from '../components/GoalDetails'
import GoalForm from '../components/GoalForm'

const Home = () => {
    const {goals, dispatch} = useGoalsContext()

    useEffect(() => {
        const fetchGoals = async () => {
            const response = await fetch('/api/goals')
            const json = await response.json()

            if (response.ok) {
               dispatch({type:'SET_GOALS', payload: json})
            }
        }

        fetchGoals ()
    }, [dispatch])

    const [showPopup, setShowPopup] = useState(false);

    const handlePopUp = () => {
      // Show the pop-up
      setShowPopup(true);
  
      // Hide the pop-up after 5 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 4500);
    };

    return (
        <div className="home">
            <div className="goals">
                {goals && goals.map((goal) => (
                    <GoalDetails key = {goal._id} goal={goal} />

                ))}
            </div>
             <GoalForm onAddGoal={handlePopUp} />
             {showPopup && <PopUp />}
        </div>
    )
}

export default Home