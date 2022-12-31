const express = require("express");
const bodyParser = require("body-parser");
const mongoose= require("mongoose");
const _=require("lodash");
// const date = require(__dirname  + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://nishantdas77:Nishant%40das77@cluster0.xxowhtf.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true});

const itemSchema={
   name:String
};

const Item= mongoose.model("Item", itemSchema);

const item1= new Item({
   name:"Welcome to TO-DO-list!"
})
const item2= new Item({
   name:"Hit the + button to add an item"
})
const item3= new Item({
   name:"<-- Hit this to delete an item"
})

const defaultItems=[item1,item2,item3];


const listSchema={
   name: String,
   items:[itemSchema]
};

const List=mongoose.model("List",listSchema);

app.get("/", function(req,res){
  
   Item.find({}, function(err,foundItems){

   if(foundItems.length ===0){
      Item.insertMany(defaultItems, function(err){
         if(err){
            console.log(err);
         } else{
            console.log("saved successfully");
         }
         res.redirect("/");
      });
   } else{

      res.render("list", {listTittle : "Today" ,newlistitem : foundItems });
   }
   })
// let day = date.getDay();
   

});

app.get("/:custom", function(req,res){
   const custom= _.lowerCase(req.params.custom);
  List.findOne({name: custom}, function(err,foundList){
   if(!err){
      if(!foundList){
         const list= new List({
            name: custom,
            items: defaultItems
         });
         list.save();
         res.redirect("/"+ custom);
      }
      else{
         res.render("list", {listTittle : foundList.name ,newlistitem : foundList.items})
      }
   }
  })
  
})


app.post("/", function(req,res){
   // console.log(req.body.list);
   let itemName = req.body.newitem;
   const listName=req.body.list;
  
     const item = new Item({
      name: itemName
     });

     if(listName ==="Today"){
       item.save();
       res.redirect("/");
     }
     else{
      List.findOne({name: listName}, function(err, foundList){
         foundList.items.push(item);
         foundList.save();
         res.redirect("/" + listName)
      })
     }
    
   
});

app.post("/delete",function(req,res){
   const checkedItem = req.body.checkbox;
   let listNam= req.body.listName;
   listNam = listNam.trim();

    if(listNam==="Today"){
      Item.findByIdAndRemove(checkedItem, function(err){
         if(!err){
            
            res.redirect("/");
            console.log("successfully deleted item.");
          }
         
   })
   } else{
    List.findOneAndUpdate({name:listNam},{$pull:{items:{_id: checkedItem}}},function(err, foundList){
      if(!err){
         
         res.redirect("/" + listNam);
         console.log("successfully deleted item.");
      }
    })  
   }
})


app.get("/about", function(req,res){
   res.render("about");
})

// app.post("/work", function(){
//      let item = req.body.newitem;
//      workItems.push(item);
//      res.redirect("/work");
// })

app.listen(3000,function(){
    console.log("the server is running");
})