const express = require("express");
const { Deta } = require("deta");
const deta = Deta(process.env.PRIMARY_KEY);// configure your Deta project
const mdb = deta.Base("Message-DB");
const db = deta.Base("Open-CSS-Loaders-DB"),
router = express.Router();
const cors = require("cors");

var corsOptions = {
  origin: 'https://opencssloader.netlify.app',
  optionsSuccessStatus: 200
}
router.all("*",cors(corsOptions));


router.get("/getloaders", async (req, res) => {
    var loaders = await db.fetch().next();
    if(loaders)
    res.json(loaders);
    else res.status(404).send("ERROR")
})
router.get("/serveranypopup", async (req, res) => {
    var message = await mdb.get("sez55rob6u7i");
    if (message) res.json(message.message);
    else res.send("NO");
  });
router.post("/addthispopup", async (req, res) => {
    var message = req.body.message;
    var pass = req.body.pass;
    if (message && pass && pass === process.env.SECRET_KEY) {
      var m = await mdb.update({ message: message }, "sez55rob6u7i");
      if (m)res.send("Error Setting Popup")
      else res.send("popup set");
    } else {
      res.send("Worng Password");
    }
});
router.post("/addthiscode", async (req, res) => {
  var { loaderid,lname, html, css, contributor } = req.body;
  var toCreate = {loaderid,lname, html, css, contributor };
 toCreate.contributor = toCreate.contributor || "Anonymous"; 
  toCreate.likes = 0;
  toCreate.loaderid = parseInt(req.body.loaderid);
  var insertedUser = await db.put(toCreate); // put() will autogenerate a key for us
  res.status(201).json(insertedUser);
});
// router.post("/addthiscode", (req, res) => {
//   var post = req.body;
//   console.log(post);
//   connection.query("INSERT INTO loaders SET ?", post, (err, result) => {
//     if (err) res.send(err);
//     else res.send(result);
//   });
// });
// router.post("/updatecode", (req, res) => {
//   connection.query("Select * from others where mtype = 'PASSWORD'", (err, result) => {
//     if (req.body.password != result[0].content) {
//       res.send("NO");
//     } else {
//       connection.query("UPDATE loaders SET html = ?, css = ?, lname =?, contributor = ? where loaderid = ?", [req.body.html, req.body.css, req.body.lname, req.body.contributor, req.body.loaderid], function (err, result) {
//         if (err) {
//           console.log(err);
//           res.send("Error");
//         } else res.send("Done");
//       });
//     }
//   });
// });

// router.post("/")

router.put("/like/:loader", (req, res) => {
  var val = req.body.like == "true" ? 1 : -1;
  const update = db.update({likes : db.util.increment(val)},req.params.loader);
   res.json({val:val});
  // connection.query("UPDATE loaders SET likes = likes + ? WHERE loaderid = ?", [val, req.params.loader], (err, result) => {
  //   if (err) res.send(err);
  //   else res.json({ val: val });
  // });
});

// router.post("/imgoingtodeletethispost", (req, res) => {
//   connection.query("Select * from others where mtype = 'PASSWORD'", (err, result) => {
//     if (req.body.password != result[0].content) {
//       res.send("wrong password");
//     } else {
//       connection.query("DELETE from loaders WHERE loaderid = ?", req.body.loaderid, (err, result) => {
//         if (err) {
//           console.log(err);
//           res.send(err);
//         } else res.send("Done");
//       });
//     }
//   });
// });
module.exports = router;
