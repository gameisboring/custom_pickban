const name = '관리자'
const socket = io.connect()

const champThumbInput = document.querySelector('#champThumb')
const champNameInput = $('#champName')

socket.emit('joinRoom', name)

$('#btns').click(() => {
  socket.emit('chat message', name, $('#msgInput').val())
  $('#msgInput').val('')
  return false
})

socket.on('chat message', (name, msg) => {
  $('#messages').append($('<li>').text(name + '  :  ' + msg))
})

socket.on('joinRoom', (name) => {
  $('#messages').append($('<li>').text(name + '    joined :)'))
})

$('#addChampBtn').on('click', () => {
  let formData = new FormData()
  formData.append('champName', champNameInput.val())
  formData.append('champThumb', champThumbInput.files[0])

  fetch('champ', {
    method: 'POST',
    cache: 'no-cache',
    body: formData,
  }).then((res) => {
    console.log(res)
    if (res.ok) {
      alert('정보 등록 성공')
    } else {
      alert('정보 등록 실패')
    }
  })
})
