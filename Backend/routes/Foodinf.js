const mongoose = require("mongoose");
const express = require("express");
const route = express.Router();

const foodinformationschema = new mongoose.Schema({
    foodname: { type: String, required: true },
    foodimage: { type: String, required: true },
    foodprice: { type: String, required: true },
    fooddescription: { type: String, required: true },
    foodgenre: { type: String, required: true }
});
const foodinformation = mongoose.model("food", foodinformationschema);

route.post("/", async (req, res) => {
    try {
        const { foodname, foodimage, foodprice, fooddescription, foodgenre } = req.body;
        if (!foodname || !foodimage || !foodprice || !fooddescription || !foodgenre) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const food = new foodinformation({
            foodname,
            foodimage,
            foodprice,
            fooddescription,
            foodgenre
        });
        await food.save();
        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

route.get("/", async (req, res) => {
    try {
        const food = await foodinformation.find();
        res.status(200).json(food);
    } catch (error){
        res.status(500).json({ error: "Failed to fetch food data", message: error.message });
    }
});
route.put("/:id", async (req, res) => {
    try {
        const { foodname, foodimage, foodprice, fooddescription, foodgenre } = req.body;
        
        const updatedFood = await foodinformation.findByIdAndUpdate(
            req.params.id,
            { foodname, foodimage, foodprice, fooddescription, foodgenre},
            { new: true }
        );
        if (!updatedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json(updatedFood);  // ✅ Correct response
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
route.delete('/:id',async(req,res)=>{
    const deletefood = await foodinformation.findByIdAndDelete(req.params.id)
    res.send(deletefood)
})

module.exports = route;
