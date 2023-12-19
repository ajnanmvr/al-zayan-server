const mongoose = require("mongoose");

let CategoryModel;

try {
  // Check if the model has already been defined
  CategoryModel = mongoose.model("Category");
} catch (e) {
  // If not, define the model
  const categorySchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  CategoryModel = mongoose.model("Category", categorySchema);
}

module.exports = CategoryModel;
