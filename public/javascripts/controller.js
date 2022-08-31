const name = '컨트롤러'
const socket = io.connect()

const champSelectBtn = $('#champSelectBtn')

$.ajax({
  url: 'champ',
  methods: 'GET',
  success: (res) => {
    console.log(res)
    for (i in res) {
      const option = document.createElement('option')
      option.setAttribute('value', res[i].ch_thumb)
      option.innerText = res[i].ch_name
      champSelect.append(option)
    }
  },
})

champSelectBtn.on('click', () => {
  const selectedChamp = $('#champSelect').val()
  const selectedChampName = $('#champSelect option:checked').text()
  socket.emit('champ select', selectedChamp, selectedChampName)
})
