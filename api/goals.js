const Goal = require('./models/goalModel')
const mongoose = require('mongoose')
const connectDB = require('./utils/db')

// Helper function to handle CORS
const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

module.exports = async (req, res) => {
  setCorsHeaders(res)
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    await connectDB()

    const { method, query } = req
    const { id } = query

    switch (method) {
      case 'GET':
        if (id) {
          // Get single goal
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such goal big dawg'})
          }

          const goal = await Goal.findById(id)
          if (!goal) {
            return res.status(404).json({error: 'No such goal big dawg'})
          }

          return res.status(200).json(goal)
        } else {
          // Get all goals
          const goals = await Goal.find({}).sort({createdAt: -1})
          return res.status(200).json(goals)
        }

      case 'POST':
        const {goalName, goalDescription, goalTimeframe} = req.body

        let emptyFields = []
        if(!goalName) emptyFields.push('Goal Name')
        if(!goalDescription) emptyFields.push('Goal Description')
        if(!goalTimeframe) emptyFields.push('Goal Timeframe')
        
        if(emptyFields.length > 0) {
          return res.status(400).json({error: 'Please fill in all fields', emptyFields})
        }

        const goal = await Goal.create({goalName, goalDescription, goalTimeframe})
        return res.status(200).json(goal)

      case 'PATCH':
        if (!id) {
          return res.status(400).json({error: 'Goal ID is required'})
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({error: 'No such goal big dawg'})
        }

        const updatedGoal = await Goal.findOneAndUpdate(
          {_id: id}, 
          {...req.body},
          {new: true}
        )

        if (!updatedGoal) {
          return res.status(404).json({error: 'No such goal big dawg'})
        }

        return res.status(200).json(updatedGoal)

      case 'DELETE':
        if (!id) {
          return res.status(400).json({error: 'Goal ID is required'})
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({error: 'No such goal big dawg'})
        }

        const deletedGoal = await Goal.findOneAndDelete({_id: id})
        if (!deletedGoal) {
          return res.status(404).json({error: 'No such goal big dawg'})
        }

        return res.status(200).json(deletedGoal)

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({error: error.message})
  }
}