module.exports = (app) => {
  app.io = require('socket.io')()

  app.io.on('connection', (socket) => {
    console.log('User Connect')

    socket.on('joinRoom', (name) => {
      console.log('joinRoom : ' + name)
      app.io.emit('joinRoom', name)
    })

    socket.on('chat message', (roomName, name, msg) => {
      console.log(msg)
      app.io.emit('chat message', roomName, name, msg)
    })

    socket.on(
      'champ select',
      (selectedChamp, selectedChampName, teamAndNumber) => {
        console.log(selectedChamp)
        console.log(selectedChampName)
        console.log(teamAndNumber)
        app.io.emit(
          'champ select',
          selectedChamp,
          selectedChampName,
          teamAndNumber
        )
      }
    )
  })

  return app.io
}
