const express = require('express')
const shortid = require('shortid')

const server = express()
server.use(express.json())




const PORT = 5000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

let users = []

const { check, validationResult } = require('express-validator')


//C - create (POST)
//R - read (GET)
//U - update (PUT)
//D - delete (DELETE)


//CREATE
server.post('/api/users', [

  check('name').isLength({ min: 1 }),
  check('bio').isLength({ min: 1 })

], (req, res) => {

  const errors = validationResult(req)

  if(!errors.isEmpty()){
    res.status(400).json({ message: "please provide name and bio for the user" })
  }

  else{
    const userInfo = req.body
    userInfo.id = shortid.generate()
    users.push(userInfo)
    res.status(201).json(userInfo)
  }

})


//READ
server.get('/api/users', (req, res) => {
  res.status(200).json(users)
})

server.get('/api/users/:id', (req, res) => {

  const {id} = req.params
  let user = users.find(user => user.id === id)

  if (user){
    res
      .status(200)
      .json(user)
  } else {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist' })
  }
})


//UPDATE
server.put('/api/users/:id', [

  check('name').isLength({ min: 1 }),
  check('bio').isLength({ min: 1 })

], (req, res) => {


  if(!errors.isEmpty()){
    res.status(400).json({ message: "please provide name and bio for the user" })
  }

  else{

    const {id} = req.params
    const changes = req.body
  
    let index = users.findIndex(user => user.id === id)
  
    if (index !== -1){
      users[index] = changes
      res.status(200).json(users[index])
    } else {
      res.status(404).json({ message: 'id not found' })
    }
  }
})

server.patch('/api/users/:id', (req, res) => {
  const {id} = req.params
  const changes = req.body

  let found = users.find(user => user.id === id)

  if (found) {
    Object.assign(found, changes)
    res.status(200).json(found)
  } else {
    res.status(404).json({ message: 'user not found' })
  }

})


//DELETE
server.delete('/api/users/:id', (req, res) => {

  const {id} = req.params
  const deleteItem = users.find(user => user.id === id)

  if (deleteItem) {
    users = users.filter(user => user.id !== id)
    res.json(deleteItem)
  } 
  
  else {
    res.status(404).json({ message: 'The user with the specified ID does not exist.' })
  }

})