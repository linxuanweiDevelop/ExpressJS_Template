const express = require('express')
const router = express.Router()
require('dotenv').config()

const cors = require('cors')
const bodyParser = require('body-parser')

//設置跨來源共享
router.use(cors())

//設置body-parser中間件
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', (req, res)=>{
    const userAgent = req.headers["user-agent"]
    res.status(200).json({
        Title : "ExpressJS Template",
        userAgent
    })
})

//設置靜態文件
router.use(express.static(__dirname + "/public"))
router.use(/.*$/, express.static(__dirname + "/public"))

module.exports = { router }
