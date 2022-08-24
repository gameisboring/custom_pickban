const name = '컨트롤러'
const socket = io.connect()
const champSelect = $('#champSelect')

$.ajax({
  url: 'champ',
  methods: 'GET',
  success: (res) => {
    console.log(res)
    for (i in res) {
      const option = document.createElement('option')
      option.setAttribute('value', res[i].ch_name)
      option.innerText = res[i].ch_name
      champSelect.append(option)
    }
  },
})
