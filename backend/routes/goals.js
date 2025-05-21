const express = require('express');
const {
    createGoal,
    getGoals,
    getGoal,
    deleteGoal,
    updateGoal
} = require('../controllers/goalController')
const router = express.Router()

//////////////////////////////////ROUTES FOR PERFORMING THE CRUDE OPS/////////////////////
//getting all the user's goals
router.get('/', getGoals)

//getting a single user goal
router.get('/:id', getGoal)

//post a new goal
router.post('/', createGoal)

//delete a goal
router.delete('/:id', deleteGoal)

//update a new goal
router.patch('/:id', updateGoal)



module.exports = router