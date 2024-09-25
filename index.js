const express = require('express')
const Instance = express()
require('dotenv').config()

const fs = require('node:fs')
var https = require('https')

const App = require("./app")

const serverPort = process.env.serverPort
const useTLS = process.env.useTLS
Instance.use(App.router)

if(!(useTLS === "true")){
  //啟動服務
  Instance.listen(serverPort, () => {
    console.log('Server listening on port ' + serverPort + '!')
  })

}else{
  let keyPath = process.env.keyPath
  let certPath = process.env.certPath
  let hskey = fs.readFileSync(keyPath)
  let hscert = fs.readFileSync(certPath)
  
  let TLS_Instance = https.createServer({
    key: hskey,
    cert: hscert
  }, Instance)
  
  // 啟動服務
  TLS_Instance.listen(serverPort, () => {
    console.log('Server with TLS listening on port ' + serverPort + '!')
  })

}

