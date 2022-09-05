const express = require('express')
const router = express.Router()
const fs = require('fs')
const { upload } = require('../multer')
const layoutConfig = require('../data/layout-config.json')

/*
 * check and make
 */
try {
  fs.readdirSync('public/images/upload') // 폴더 확인
} catch (err) {
  console.error('public/images/upload 폴더가 없습니다. 폴더를 생성합니다.')
  fs.mkdirSync('public/images/upload') // 폴더 생성
}

try {
  fs.readFileSync('data/champ.json')
} catch (error) {
  const data = []
  console.error(
    'champion.json 파일이 없습니다. 새로운 champion.js 파일을 생성합니다.'
  )
  fs.writeFileSync('data/champ.json', JSON.stringify(data)) // 폴더 생성
}
const champions = require('../data/champ.json')

/**
 * GET /
 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'New Title' })
})

/**
 * GET /champ : champ.json
 */
router.get('/champ', async (req, res) => {
  res.json(champions)
})

/**
 * POST /chmap : write json
 */
router.post(
  '/champ',
  upload.single('champThumb'),
  async function (req, res, next) {
    console.log(req.file.path + ' 에 저장되었습니다')
    console.log(req.body.champName)
    const result = champions.push({
      champThumb: req.file.filename,
      champName: req.body.champName,
    })
    fs.writeFileSync('data/champ.json', JSON.stringify(champions))
    if (result > 0) {
      res.status(200)
      res.statusMessage = 'good'
      res.send()
    } else {
      res.status(500)
      res.statusMessage = 'wrong'
    }
  }
)

/**
 * GET /view
 */
router.get('/view', (req, res) => {
  res.render('view', layoutConfig)
})

/**
 * GET /controller
 */
router.get('/controller', (req, res) => {
  res.render('controller', layoutConfig)
})

module.exports = router
