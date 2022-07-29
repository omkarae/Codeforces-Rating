const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// const userData ;
// const curRating ;
// const maxRating ;
// const rank ;
// const user ;
// const maxRank ;

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home");
});
app.post("/",function(req,res){
  const userName = req.body.userID;
  const userInfo = "https://codeforces.com/api/user.info?handles=";
  const userRating = "https://codeforces.com/api/user.rating?handle="
  const urlInfo = userInfo + userName;
  https.get(urlInfo,function(response){
    if(response.statusCode=== 200){
      response.on("data",function(data){
        const userData = JSON.parse(data);
        const curRating = userData.result[0].rating;
        const maxRating  = userData.result[0].maxRating;
        const rank = userData.result[0].rank;
        const user = userData.result[0].handle;
        const maxRank = userData.result[0].maxRank;
        res.render("result",{user:user,rank:rank,curRating:curRating,maxRank:maxRank,maxRating:maxRating});
      })
    }
    else{
      res.render("error");
    }
  })

});

app.listen(process.env.PORT || 3000,function(){
  // console.log("Server is running on port 3000");
});
