const name = '관리자'
const socket = io.connect()
socket.emit('joinRoom', name)

const champThumbInput = $('#champThumb')
const champNameInput = $('#champName')
const previewImg = $('#previewImg')
const uploadBox = document.querySelector('#output')

var preFormData = new FormData()

$('#addChampBtn').on('click', () => {
  const realFormData = new FormData()
  if (champNameInput.val()) {
    realFormData.set('champName', champNameInput.val())
  } else {
    alert('챔피언 이름을 입력해주세요')
    return
  }
  if (!preFormData.get('champThumb')) {
    alert('챔피언 이미지를 업로드 해주세요')
    return
  } else {
    realFormData.set('champThumb', preFormData.get('champThumb'))
  }

  fetch('champ', {
    method: 'POST',
    cache: 'no-cache',
    body: realFormData,
  }).then((res) => {
    console.log(res)
    if (res.ok) {
      alert('정보 등록 성공')
      champNameInput.val('')
      champThumbInput.val('')
      previewImg[0].src = '/images/file_upload.svg'
      preFormData.delete('')
    } else {
      alert('정보 등록 실패')
    }
  })
})

previewImg.click(() => {
  champThumbInput.click()
})

champNameInput.on('keyup', (key) => {
  if (key.keyCode == 13) {
    $('#addChampBtn').click()
  }
})

champThumbInput.change(() => {
  previewFile()
})

uploadBox.addEventListener('dragenter', function (e) {
  console.log('dragenter')
})

uploadBox.addEventListener('dragover', function (e) {
  e.preventDefault()
  console.log('dragover')
  this.style.opacity = '30%'
})

uploadBox.addEventListener('dragleave', function (e) {
  console.log('dragleave')
  this.style.opacity = '100%'
})

uploadBox.addEventListener('drop', function (e) {
  e.preventDefault()

  console.log('drop')
  this.style.opacity = '100%'
  var file = e.dataTransfer.files[0]
  if (isValid(file)) {
    console.log('is valid')
  }

  previewFile(file)
})

function previewFile(dropedFile) {
  const file = dropedFile ? dropedFile : champThumbInput[0].files[0]
  const reader = new FileReader()
  console.log(file)
  reader.addEventListener(
    'load',
    function () {
      console.log(reader)
      previewImg[0].src = reader.result
    },
    false
  )
  if (file) {
    reader.readAsDataURL(file)
    preFormData.set('champThumb', file)
  }
}

function isValid(file) {
  if (file.type.indexOf())
    if (file.type.indexOf('image') < 0) {
      alert('이미지 파일만 업로드 가능합니다.')

      return false
    }
  if (file.size >= 1024 * 1024 * 5) {
    alert('5MB 이상인 파일은 업로드할 수 없습니다.')
    return false
  }
  return true
}
