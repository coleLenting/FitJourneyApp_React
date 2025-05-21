const Goal = require("../models/goalModel")
const mongoose = require('mongoose')

////////////////////////////////CRUD OPS//////////////////////////
//get all goals
const getGoals = async(req, res) =>{
    const goals = await Goal.find({}).sort({createdAt: -1})  //shows all goals sorted by date/time

    res.status(200).json(goals)
}

//get single goal
const getGoal = async (req, res) => {
    const { id } = req.params
    ///to check if the id of the goal being requested is valid by matching the against what mongoose has
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such goal big dawg'})
    }

    const goal = await Goal.findById(id)

    if (!goal){
        return res.status(404).json({error: 'No such goal big dawg'}) ///if the goal being requetsed is not found
    }

    res.status(200).json(goal) ///we found a goal
}

//create new goal
const createGoal = async(req, res) => {
    const {goalName, goalDescription, goalTimeframe} = req.body

    let emptyFields = []

    if(!goalName){
        emptyFields.push('Goal Name')
    }
    if(!goalDescription){
        emptyFields.push('Goal Description')
    }
    if(!goalTimeframe){
        emptyFields.push('Goal Timeframe')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({erro: 'Please fill in all fields', emptyFields})
    }

//add DB doc
    try {
        const goal = await Goal.create({goalName, goalDescription, goalTimeframe})
        res.status(200).json(goal)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//delete
const deleteGoal = async (req, res) => {
    const { id } = req.params

    ///to check if the id of the goal being requested is valid by matching the against what mongoose has
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such goal big dawg'})
    }

    const goal = await Goal.findOneAndDelete({_id: id})

    if (!goal){
        return res.status(404).json({error: 'No such goal big dawg'}) ///if the goal being requetsed is not found
    }

    res.status(200).json(goal)
}

//update
const updateGoal = async (req, res) => {
    const { id } = req.params

    ///to check if the id of the goal being requested is valid by matching the against what mongoose has
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such goal big dawg'})
    }

    const goal = await Goal.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!goal){
        return res.status(404).json({error: 'No such goal big dawg'}) ///if the goal being requetsed is not found
    }

    res.status(200).json(goal)
}


module.exports = {
    createGoal,
    getGoals,
    getGoal,
    deleteGoal,
    updateGoal
}