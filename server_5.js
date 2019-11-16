const express = require('express');
const hbs = require('hbs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
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
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    if (text) return text.toUpperCase();
    return "";
});

app.get('/', (req, res) => {
    res.render(
        'home.hbs',
        {
            pageTitle: 'home page',
            Name: "palmonaz",
            welcome: "welcome to zimbawie",
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
