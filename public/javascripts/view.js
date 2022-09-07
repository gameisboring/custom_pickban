const champThumb = $('#champThumbnail')

$.ajax({
  url: 'champ',
  methods: 'GET',
  success: (res) => {
    console.log(res)
  },
})

const socket = io()

socket.on('champ select', (image, name, classList) => {
  console.log(classList[0])
  let selector = $(
    `#pickban .${classList[0]}.${[classList[1]]}.${[classList[2]]}`
  )
  selector.css(
    'background',
    `url("images/upload/${image}") no-repeat center top/ cover`
  )
})
