//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const favicon = require('serve-favicon');
const bcryptjs = require("bcryptjs");
const path = require('path');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const flash = require("connect-flash");
const multer = require("multer");
const passportLocalMongoose = require("passport-local-mongoose");
const passportLocal = require("passport-local");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();


app.use(express.static("public"));
//app.use(favicon(path.join(__dirname, "public", "logo","newfavicon.png")));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.connect("mongodb+srv://anikettiwari99:<password>@cluster0-r4a27.mongodb.net/test?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  firstname: String,
  name: String,
  username: String,
  password: String,
  googleId: String,
  facebookId: String,
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "File"
  }]
});

const fileSchema = new mongoose.Schema({
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  p_name: String,
  trade: String,
  description: String,
  file: String
});

const feedbackSchema = new mongoose.Schema({
  username: String,
  comment:String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
const File = new mongoose.model("File", fileSchema);
const Feedback = new mongoose.model("Feedback", feedbackSchema);

passport.use(User.createStrategy());

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single("file");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/afterlogin"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({
        googleId: profile.id
      }, {
        name: profile.displayName,
        username: profile.emails[0].value,
        firstname: profile.name.givenName
      },
      function(err, user) {
        return cb(err, user);
      });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/afterlogin",
    profileFields: ['id','displayName','first_name','email']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({
      facebookId: profile.id
    },{
      name: profile.displayName,
      username: profile.emails[0].value,
      firstname: profile.name.givenName
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/auth/google",
  passport.authenticate('google', {
    scope: ["email profile"]
  })
);

app.get("/auth/google/afterlogin",
  passport.authenticate('google', {
    failureRedirect: "/"
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/afterlogin");
  });

app.get('/auth/facebook',
  passport.authenticate('facebook',{
    scope: ["email"]
  }));

app.get('/auth/facebook/afterlogin',
  passport.authenticate('facebook', {
    failureRedirect: '/'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/afterlogin');
  });

app.get("/login", function(req, res) {
  res.render("login", {
    message: req.flash("message")
  });
});

app.get("/register", function(req, res) {
  res.render("register", {
    message: req.flash("message")
  });
});

app.get("/afterlogin", function(req, res) {
  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log(foundUser.username);
        console.log(foundUser.name);
        console.log(foundUser.firstname);
        File.find({
          leader: req.user.id
        }, function(err, foundfile) {
          if (err) {
            console.log(err);
          } else {
            if (foundfile) {
              res.render("afterlogin", {
                ename: foundUser,
                userswithfile: foundfile
              });
            }
          }
        });
      }
    }
  });
});

app.post("/afterlogin", upload, function(req, res) {
  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        const file1 = new File({
          p_name: req.body.p_name,
          trade: req.body.trade,
          description: req.body.description,
          file: req.file.filename,
          leader: foundUser._id
        });
        foundUser.files = file1;
        file1.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            File.find({})
              .populate("leader")
              .exec(function(error, posts) {
                console.log(posts)
              })
          }
          res.redirect("/afterlogin");
        });
      }
    }
  });
});


app.post("/feedback",function(req,res){
  const feedback = new Feedback({
    username: req.body.email,
    comment:req.body.comment
  });
  feedback.save();
  res.redirect("back");
});

app.get("/cse", function(req, res) {
  File.find({
    "p_name": {
      $ne: null
    }
  }, function(err, foundFiles) {
    if (err) {
      console.log(err);
    } else {
      if (foundFiles) {
        res.render("cse", {
          project: foundFiles
        });
      }
    }
  });
});

app.get("/ee", function(req, res) {
  File.find({
    "p_name": {
      $ne: null
    }
  }, function(err, foundFiles) {
    if (err) {
      console.log(err);
    } else {
      if (foundFiles) {
        res.render("ee", {
          project: foundFiles
        });
      }
    }
  });
});

app.get("/me", function(req, res) {
  File.find({
    "p_name": {
      $ne: null
    }
  }, function(err, foundFiles) {
    if (err) {
      console.log(err);
    } else {
      if (foundFiles) {
        res.render("me", {
          project: foundFiles
        });
      }
    }
  });
});

app.get("/civil", function(req, res) {
  File.find({
    "p_name": {
      $ne: null
    }
  }, function(err, foundFiles) {
    if (err) {
      console.log(err);
    } else {
      if (foundFiles) {
        res.render("civil", {
          project: foundFiles
        });
      }
    }
  });
});

app.get("/ec", function(req, res) {
  File.find({
    "p_name": {
      $ne: null
    }
  }, function(err, foundFiles) {
    if (err) {
      console.log(err);
    } else {
      if (foundFiles) {
        res.render("ec", {
          project: foundFiles
        });
      }
    }
  });
});


app.get("/description/:id", function(req, res) {
  File.findById(req.params.id, function(err, foundproject) {
    if (err) {
      console.log(err);
    } else {
      if (foundproject) {
        res.render("description", {
          pdetail: foundproject
        });
      }
    }
  });
});

app.get("/about_us",function(req,res){
  res.render("about_us");
});

app.get("/delete/:id", function(req, res) {
  File.findByIdAndDelete(req.params.id, function(err, foundproject) {
    if (err) {
      console.log(err);
    }
    res.redirect("/afterlogin");
  });
});

app.get("/edit_form/:id", function(req, res) {
  File.findById(req.params.id, function(err, foundproject) {
    if (err) {
      console.log(err);
    }
    res.render("edit_form",{data: foundproject});
  });
});

app.post("/update/",upload,function(req,res){
  const update = File.findByIdAndUpdate(req.body.id,{
    p_name: req.body.p_name,
    trade: req.body.trade,
    description: req.body.description,
    file: req.file.filename,
  },function(err,foundproject){
    if(err){
      console.log(err);
    }
    res.redirect("/afterlogin");
  });
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});



app.post("/register", function(req, res) {
  User.register({
    name: req.body.name,
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      if (err.message === "No username was given") {
        req.flash("message", "No Email was given")
      } else if (err.message === "A user with the given username is already registered") {
        req.flash("message", "Email address already is use")
      } else {
        req.flash("message", err.message);
      }
      //  res.render("register",{message : req.flash("error","Email is invalid")});
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/afterlogin");
      });
    }
  });
});

/*app.post("/login", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    }
     else {
      passport.authenticate("local")
      (req, res, function() {
          res.redirect("/afterlogin");
      });
    }
  });
});*/


app.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      //  return res.send(401,{ success : false, message : 'authentication failed' });
      req.flash("message", " Invalid Email or password!");
      res.redirect("login");
      //  return req.flash("message","User not found");
    }
    req.login(user, function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/afterlogin");
      //return res.send({ success : true, message : 'authentication succeeded' });
    });
  })(req, res, next);
});

app.listen(3001, function() {
  console.log("Server is up and running on port 3001");
});
