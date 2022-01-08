const express = require('express');
const Student = require('../models/Student')

const getAll = async (req, res, next) => {
  try {
    const studentList = await Student.find()
    res.render('students/index',{
      students: studentList
    })
  }
  catch(err) {
    console.log(err.message)
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params
  try {
    const studentById = await Student.findById(id)
    res.render('students/detail',{
      student: studentById
    })
  }
  catch(err) {

  }
}

const create = async (req, res, next) => {
  if(!req.body) {
    res.status(400).send({ message : "Content can not be empty!"})
    return
  }

  const { firstName, lastName, email, gender } = req.body
  const studentNew = new Student({
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: gender
  })

  try {
    await studentNew.save()
    res.redirect('/student')
  }
  catch(err) {
    res.status(400).send({ message : "Save unsuccessful"})
  }
}

const openUpdate = async (req, res, next) => {
  const { id } = req.params
  try {
    const studentById = await Student.findById(id)
    res.render('students/update',{
      student: studentById
    })
  }
  catch(err) {

  }
}

const update = async (req, res, next) => {
  const id = req.body._id 
  const newStudent = req.body
  try {
    await Student.findByIdAndUpdate(id, newStudent)
    res.redirect('/student')
  }
  catch (err) {
    res.status(400).send({ message : "Save unsuccessful, err: " + err.message})
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params
  try {
    await Student.findByIdAndDelete(id)
    res.redirect('/student')
  }
  catch(err) {
    res.status(400).send({ message : "Delete unsuccessful"})
  }
}

module.exports = {getAll, create, getById, remove, openUpdate, update}