const champThumb = $('#champThumbnail')

$.ajax({
  url: 'champ',
  methods: 'GET',
  success: (res) => {
    console.log(res)
    for (i in res) {
      const div = document.createElement('div')
      div.innerHTML = `<img class="thumb" src="/images/${res[i].ch_thumb}" alt="${res[i].ch_thumb}" srcset="" /> <span>${res[i].ch_name}</span>`

      champThumb.append(div)
    }
  },
})
