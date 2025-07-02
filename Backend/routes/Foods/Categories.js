const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: {type:String}
});

const Categories = mongoose.model("Categories", categoriesSchema);

route.post("/", async (req, res) => {
  const categories = new Categories({
    name: req.body.name,
    image: req.body.image,
  });
  categories.save();
  res.send(categories);
  res.status(201).json({ message: "Genre added successfully!", genre });
});

route.get("/", async (req, res) => {
  const categories = await Categories.find();
  res.send(categories);
});

route.put("/:id", async (req, res) => {
  const categories = await Categories.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, image: req.body.image },
    (required = true)
  );
  res.send(categories);
});

route.delete("/:id", async (req, res) => {
  const categories = await Categories.findByIdAndDelete(req.params.id);
  res.send(categories);
});
route.get('/:id',async(req,res)=>{
    const categories= await Categories.findById(req.params.id) 
    res.send(categories)
})
module.exports = route;
