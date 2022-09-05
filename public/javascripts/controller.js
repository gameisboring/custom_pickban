const name = '컨트롤러'
const socket = io.connect()

const modalChamp = $('.modal .modalBody .champs')

/**
 * pick buttons click event
 */
$('#pickban .team .picks .pick').on('click', (e) => {
  modalOn()
  if (!$('.modal').hasClass('show')) {
    $('body').css('overflow', 'hidden')
  }
  sendChampSelectWithAjax(e)
})

$('#pickban .team .bans .ban').on('click', (e) => {
  modalOn()
  if (!$('.modal').hasClass('show')) {
    $('body').css('overflow', 'hidden')
  }
  sendChampSelectWithAjax(e)
})

$('.modal').on('click', (e) => {
  if (e.target === $('.modal')[0]) {
    modalOff()
    if (!$('.modal').hasClass('show')) {
      $('body').css('overflow', 'auto')
    }
  }
})

function modalOn() {
  $('.modal').addClass('show')
  $('.modal').removeClass('hide')
}
function modalOff() {
  $('.modal').addClass('hide')
  $('.modal').removeClass('show')
}

function champBtnClick(e, champ) {
  // 입력될 Info
  const champName = champ.srcElement.attributes.cname.value
  const champThumb = champ.srcElement.attributes.cthumb.value
  const teamAndNumber = JSON.parse(JSON.stringify(e.target.classList))
  // 입력될 Element
  e.target.innerText = champName
  e.target.previousElementSibling.style.background = `url('images/upload/${champThumb}') no-repeat center top/ cover`
  console.log()
  modalOff()
  socket.emit('champ select', champThumb, champName, teamAndNumber)
}

function sendChampSelectWithAjax(e) {
  $.ajax({
    url: 'champ',
    methods: 'GET',
    success: (res) => {
      modalChamp.empty()
      console.log(res)
      for (i in res) {
        const champBtn = document.createElement('div')
        champBtn.classList.add('champSelectBtn')
        champBtn.style.background = `rgba(0, 0, 0, 0.5) url('images/upload/${res[i].champThumb}') no-repeat center center/cover`
        champBtn.setAttribute('cname', res[i].champName)
        champBtn.setAttribute('cthumb', res[i].champThumb)
        champBtn.onclick = (champ) => {
          champBtnClick(e, champ)
        }
        champBtn.innerText = res[i].champName

        modalChamp.append(champBtn)
      }
    },
  })
}
