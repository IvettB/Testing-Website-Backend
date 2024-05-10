const express = require(`express`)
const router = express.Router()

const Task = require(`../models/Task`)

/**
 * GET: Returns one task with the task's id specified in the path
 */
router.get(`/:id`, async (req, res) => {
	try {
		const task = await Task.findById(req.params.id)
		if (!task) res.status(404).send(`Task with ID ${req.params.id} does not exist.`)
		else res.status(200).send(task)
	} catch (error) {
		console.error(error)
		res.status(500).send(`Something went wrong.`)
	}
})

// TODO: Write 4 more handlers for create, read, update, and delete.
// The verb after `router.` should match the table in the instructions, Step 7
router.post('/', async (req, res) => {
	try {
		let newTask = new Task({UserId: req.user.Id, Text: req.body.Text, Done: false, Date: req.body.Date})
		let savedTask = await newTask.save()
		res.status(201).send(savedTask)
		}
	catch (error) {
		console.error(error)
		res.status(500).send(`Something went wrong.`)
	}
}), 

router.get('/', async (req, res) => {
	try {
		const tasks = await Task.find({UserId: req.user.Id})
		res.status(200).send(tasks)
	}
	catch (error) {
		console.error(error)
		res.status(500).send(`Something went wrong.`)
	}
}),

router.put('/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id)
		if (req.body.Done == null)
			throw new Error(res.status(500).send(`Something went wrong.`))
		if (!task) res.status(404).send(`Task with ID ${req.params.id} does not exist.`)
			else 
				var updatedTask = await Task.updateOne({_id: req.params.id}, {Done: req.body.Done})
				res.status(200).send(updatedTask)
	}
	catch (error) {
		console.error(error)
		res.status(500).send(`Something went wrong.`)
	}
}),

router.delete('/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id)
		if (!task) res.status(404).send(`Task with ID ${req.params.id} does not exist.`)
			else 
				var deletedTask = await Task.deleteOne({_id: req.params.id})
				res.status(200).send(deletedTask)
	}
	catch (error) {
		console.error(error)
		res.status(500).send(`Something went wrong.`)
	}
})

/**
 * POST: Creates one task with a body containing the text and date
 */
//router.post(/** TODO: fill in the rest */)

module.exports = router