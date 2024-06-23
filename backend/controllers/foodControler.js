import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  // Validate request body
  const { name, description, price, category } = req.body;
  if (!name || !description || !price || !category) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // Check if the image filename is set by multer
  const image_filename = req.file ? req.file.filename : "default_image.jpg";

  // Create new food item
  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: image_filename,
  });

  try {
    // Save food item to the database
    await food.save();
    res.status(201).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//  all food List

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove food item

const removeFood = async (req, res) => {
  try {
    const foodId = req.body.id;
    if (!foodId) {
      return res.status(400).json({ success: false, message: "Food ID is required" });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Unlink the image file if it exists
    if (food.image && food.image !== 'default_image.jpg') {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) {
          console.log(err);
          // You can choose to log the error or handle it in another way
        }
      });
    }

    await foodModel.findByIdAndDelete(foodId);
    res.status(200).json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addFood, listFood, removeFood };
