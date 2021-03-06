const SamsungTv = require('./lib/SamsungTv')
const express = require('express');


const args = process.argv.slice(2)
if (args.length != 4) {
  console.log('Usage: node connect.js -ip <address of the TV device> -pin <pin>')
  console.log('  e.g. node connect.js -ip 192.168.178.50 -pin 4873')
  return
}

const app = express();
const port = 8000;

const ip = args[1]
const pin = args[3]

// turn on debug logs
const DEBUG = true
console.debug = (...args) => {
  if (DEBUG) {
    console.log.apply(this, args)
  }
}

const deviceConfig = {
  ip,
  appId: '721b6fce-4ee6-48ba-8045-955a539edadb',
  userId: '654321',
}

const tv = new SamsungTv(deviceConfig)

// (optional) register listener on established connection
//tv.onConnected(() => {
//  tv.sendKey('KEY_VOLUP')
//})

// confirm PIN and send 'mute' key
//tv.init()
//  .then(() => tv.confirmPin(pin))
//  .then(() => tv.connect())
//  .then(() => tv.sendKey('KEY_MUTE'))
//tv.init()
//       .then(() => tv.confirmPin(pin))
//       .then(() => tv.connect())

app.listen(port,()=> {
     tv.init()
        .then(()=> tv.confirmPin(pin))
	.then(() => tv.connect())
     console.log('listen port 8000');
})


app.get('/mutepin', (req,res) => {
	tv.init()
  		.then(() => tv.confirmPin(pin))
  		.then(() => tv.connect())
  		.then(() => tv.sendKey('KEY_MUTE'))
    res.send('TV Muted')
})

app.get('/mute', (req,res) => {
    try{
       tv.sendKey('KEY_MUTE')
       res.send('TV Muted')
   }
   catch(err){
      tv.init()
        .then(() => tv.confirmPin(pin))
        .then(() => tv.connect())
        .then(() => tv.sendKey('KEY_MUTE'))
      res.send('Pin entered an TV muted')
   }
})



app.get('/off', (req,res) => {
    try{
       tv.sendKey('KEY_POWEROFF')
       res.send('TV Muted')
   }
   catch(err){
       tv.init()
         .then(() => tv.confirmPin())
         .then(() => tv.conect())
         .then(() => tv.sendKey('KEY_POWEROFF'))
         res.sen('Pin entered and TV Switched off')
  }
})
