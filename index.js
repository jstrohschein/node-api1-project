const express = require('express')
const shortid = require('shortid')

const server = express()
server.use(express.json())

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

let users = []



// server.get('/', (req, res) => {
//   res.json({ hello: 'World' })
// })

// server.get('/hello', (req, res) => {
//   res.json({ response: 'Hello There!' })
// })


//C - create (POST)
//R - read (GET)
//U - update (PUT)
//D - delete (DELETE)


//CREATE
//need a METHOD and a PATH
server.post('/api/users', (req, res) => {

  const userInfo = req.body
  userInfo.id = shortid.generate
  users.push(userInfo)

  res.status(201).json(userInfo)

})


//READ
server.get('/api/users', (req, res) => {
  res.status(200).json
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
      .json({ message: 'user not found' })
  }
})


//UPDATE
server.put('/api/users/:id', (req, res) => {
  const {id} = req.params
  const changes = req.body

  let index = users.findIndex(user => user.id === id)

  if (index !== -1){
    users[index] = changes
    res.status(200).json(users[index])
  } else {
    res.status(404).json({ message: 'id not found' })
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
  } 
  
  else {
    res.status(404).json({ message: 'id not found' })
  }

})