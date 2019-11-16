const express = require('express');
const hbs = require('hbs');

var app = express();

// directory views is the default for hbs
app.set('view engine', hbs);
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('list', function(items, options) {
    console.log(items);
    var out = "<ul>";
    for(var i=0, l=items.length; i<l; i++) {
      out = out + "<li>" + options.fn(items[i]) + "</li>";
    }
    return out + "</ul>";
});


app.get('/', (req, res) => {
    res.render(
        'home.hbs',
        {
            pageTitle: 'home page',
            h1: 'ciao stronzo',
            currentYear: new Date().getFullYear(),
            Name: "palmonaz",
            likes: [
                {name:'bike'},
                {name:'electric skate'},
                {name:'capoeira'}
            ]
        });
});

app.get('/about', (req, res) => {
    res.render("about.hbs", {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        code: 3004,
        message: 'generic error'
    })
});

app.listen(3000, () => {
    console.log("server started and listen on 3000");
});
