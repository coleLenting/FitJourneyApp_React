const Goal = require('../models/goalModel')
const mongoose = require('mongoose')
const connectDB = require('../utils/db')

// Helper function to handle CORS
const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS')
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such goal big dawg'})
    }

    switch (method) {
      case 'GET':
        const goal = await Goal.findById(id)
        if (!goal) {
          return res.status(404).json({error: 'No such goal big dawg'})
        }
        return res.status(200).json(goal)

      case 'PATCH':
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
        const deletedGoal = await Goal.findOneAndDelete({_id: id})
        if (!deletedGoal) {
          return res.status(404).json({error: 'No such goal big dawg'})
        }
        return res.status(200).json(deletedGoal)

      default:
        res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({error: error.message})
  }
}