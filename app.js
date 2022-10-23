var express = require("express")
var bodyParser = require("body-parser")
const { check, validationResult } = require('express-validator');
const path = require('path');
var mongoose = require("mongoose");
const { error } = require("console");


const app = express()
app.use(express.json());
var publicpath = path.join(__dirname, 'public')

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

const con = "mongodb+srv://mohansharma9221:yxXWiNVTwfHyzjzh@cluster0.ey0nymu.mongodb.net/feedback?retryWrites=true&w=majority";
const conparams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(con, conparams)

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

app.post("/sign_up", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "email": email,
        "password": password
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('/signupsuccessfully')

})


app.post("/feedback", (req, res) => {

    var state = req.body.state;
    var dict = req.body.dict;
    var city = req.body.city;
    var taluka = req.body.taluka;
    var q1 = req.body.que1;
    var q2 = req.body.que2;
    var q3 = req.body.que3;

    var data = {
        "state": state,
        "dict": dict,
        "city": city,
        "taluka": taluka,
        "q1": q1,
        "q2": q2,
        "q3": q3
    }

    db.collection('feedback').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('/thankyou')

})


app.post('/adminLogin', (req, res) => {
    //const email = req.body.email;

    const password = req.body.password;

    const query = { email: req.body.email }

    db.collection('users').find(query).toArray((err, result) => {
        if (err) {
            //throw err;
            console.log('error');
            return res.redirect('/error')
        } else if ((result[0].password === req.body.password) && (result[0].email === req.body.email)) {

            return res.redirect('/qrgen')
        } else {
            return res.redirect('/error')
        }
    })

})




////////////////user side routing /////////////
app.get("/userlogin", (req, res) => {
    res.sendFile(`${publicpath}/login_user.html`)
})
app.get("/usermanual", (req, res) => {
    res.sendFile(`${publicpath}/manual.html`)
})
app.get("/feedbackpage", (req, res) => {
    res.sendFile(`${publicpath}/index_user.html`)
})
app.get("/viewfeedback", (req, res) => {
        res.sendFile(`${publicpath}/viewfeedback.html`)
    })
    ////////////////admin side routing /////////////
app.get("/admin_login", (req, res) => {
    res.sendFile(`${publicpath}/login_admin.html`)
})
app.get("/adminmanual", (req, res) => {
    res.sendFile(`${publicpath}/manual_admin.html`)
})
app.get("/qrgen", (req, res) => {
    res.sendFile(`${publicpath}/qr.html`)
})
app.get("/signup", (req, res) => {
    res.sendFile(`${publicpath}/signup.html`)
})
app.get("/signupsuccessfully", (req, res) => {
    res.sendFile(`${publicpath}/signup_success.html`)
})
app.get("/feedbackphase", (req, res) => {
    res.sendFile(`${publicpath}/feedbackphase.html`)
})
app.get("/forgetpassword", (req, res) => {
        res.sendFile(`${publicpath}/forgetpass.html`)
    })
    ////////////////coman routing /////////////
app.get("/stationinfo", (req, res) => {
    res.sendFile(`${publicpath}/station_info.html`)
})
app.get("/error", (req, res) => {
        res.sendFile(`${publicpath}/error.html`)
    })
    // app.get("*", (req, res) => {
    //     res.sendFile(`${publicpath}/404.html`)
    // })
app.get("/thankyou", (req, res) => {
    res.sendFile(`${publicpath}/thankyou.html`)
})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('login_user.html');
}).listen(3000);
console.log("Listening on PORT 3000");