const express = require('express')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.static('./'))

app.post('/data.json', function (req, res) {
    console.log(req.body)
    res.json({
        hello: 'ajax-interceptor',
        username: req.body.username
    })
})

app.listen(3000, function () {
    console.log('server is listening on 3000')
})
