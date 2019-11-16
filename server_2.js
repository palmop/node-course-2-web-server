const express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send({
        Name: "palmonaz",
        likes: [
            'bike',
            'electric skate',
            'capoeira'
        ]
    });
});

app.get('/about', (req, res) => {
    res.send("about page");
})

app.get('/bad', (req, res) => {
    res.send({
        code: 3004,
        message: 'generic error'
    })
})
app.listen(3000);
