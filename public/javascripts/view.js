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
  console.log(classList)
  champThumb.append(
    `<img class="thumb" src="/images/upload/${image}" alt="${image}" srcset="" /> <span>${name}</span>`
  )
})
