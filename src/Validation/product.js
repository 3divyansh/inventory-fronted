import Joi from "joi";

const scheme = Joi.object({
  user: Joi.string().required(), // Reference to the user ID
  brand: Joi.string().required().label("Brand Name").required(),
  sku: Joi.string().required().label("SKU").required(),
  category: Joi.string().min(5).max(255).optional().label("Category"),
  inventory: Joi.number().optional().label("Inventory"),
  price: Joi.number().optional().label("Price"),
  description: Joi.string().optional().min(5).label("Description"),
  metafields: Joi.object({
    caseMaterial: Joi.string().optional().label("Case Material"),
    dialColor: Joi.string().optional().label("Dial Color"),
    waterResistance: Joi.string().optional().label("Water Resistance"),
    warrantyPeriod: Joi.string().optional().label("Warranty Period"),
    movement: Joi.string().optional().label("Movement"),
    gender: Joi.string().optional().label("Gender"),
    caseSize: Joi.string().optional().label("Case Size"),
  }).required(),
  image: Joi.object().optional().label("Image"), // Optional image object
});

export function validateProduct(product) {
  return scheme.validate(product);
}
