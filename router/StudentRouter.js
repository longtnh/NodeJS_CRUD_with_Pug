const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const studentController = require('../controller/StudentController')

router.get('/', studentController.getAll)

router.get('/create', (req, res) => {
	res.render('students/create')
})

router.post('/create', studentController.create)

router.get('/:id', studentController.getById)

router.get('/delete/:id', studentController.remove)

router.get('/update/:id', studentController.openUpdate)

router.post('/update/', studentController.update)

module.exports = router