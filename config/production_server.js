const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

app.listen(9156, '127.0.0.1', () => console.log('oip-platform-react listening on port 9156!'))