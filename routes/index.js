var express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
var { pool } = require('../db')
var router = express.Router()

/*
 * directory check and make
 */
try {
  fs.readdirSync('public/images') // 폴더 확인
} catch (err) {
  console.error('public/images 폴더가 없습니다. 폴더를 생성합니다.')
  fs.mkdirSync('public/images') // 폴더 생성
}

/**
 * Multer Upload Middleware
 */
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'public/images/') // public/images 폴더 안에 저장
    },
    filename(req, file, done) {
      console.log(req.body)
      if (!req.body.champName) {
        console.log('champ name is empty')
      }
      done(null, req.body.champName + path.extname(file.originalname)) // 파일이름-날짜.확장자로 저장
    },
  }),
  fileFilter: (req, file, done) => {
    switch (file.mimetype) {
      case 'image/png':
      case 'image/jpeg':
      case 'image/gif':
      case 'image/jpg':
        {
          console.log('이미지 파일 입니다')
          done(null, true)
        }
        break
      default:
        console.log('이미지 파일만 업로드 가능합니다.')
        done(null, false)
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5메가로 용량 제한
})

/**
 * GET /
 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'New Title' })
})

/**
 * GET /champ
 */
router.get('/champ', async (req, res) => {
  const query = `SELECT * FROM champion;`
  const [rows, fields] = await pool.query(query)
  console.log(rows)
  res.send(rows)
})

/**
 * POST /chmap
 */
router.post(
  '/champ',
  upload.single('champThumb'),
  async function (req, res, next) {
    console.log(req.file.path + ' 에 저장되었습니다')

    const query = `INSERT INTO PICKBAN.champion(ch_name,ch_thumb) VALUES (?,?);`
    const [rows, fields] = await pool.query(query, [
      req.body.champName,
      req.file.filename,
    ])
    if (rows.affectedRows === 1) {
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
  res.render('view')
})

/**
 * GET /controller
 */
router.get('/controller', (req, res) => {
  res.render('controller')
})

module.exports = router
