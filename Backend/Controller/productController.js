const mongoose = require("mongoose");
const multer = require("multer");
require("./../Model/product");
const ProductSchema = mongoose.model("product");
const CategorySchema = mongoose.model("category");

module.exports.getAllProducts = (request, response, next) => {
  let filter = {};
  if (request.query.categories) {
    filter = { category: request.query.categories.split(",") };
  }
  ProductSchema.find(filter)
    .populate("category")
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getProductById = (request, response, next) => {
  ProductSchema.findOne({ _id: request.params.productid })
    .populate("category")
    .then((data) => {
      if (data == null) throw new Error("Product doesn't exist");
      else response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

//Upload image 
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('invalid image type');

      if(isValid) {
          uploadError = null
      }
    cb(uploadError, './../Frontend/src/assets/imgs/products')
  },
  filename: function (req, file, cb) {
      
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
})
module.exports.uploadOptions = multer({ storage: storage })

module.exports.addProduct = async (request, response, next) => {
    const file = request.file;
    const fileName = file.filename;
  let productObject = new ProductSchema({
    title: request.body.title,
    description: request.body.description,
    richDescription: request.body.richDescription,
    image:`assets/imgs/products/${fileName}`,
    price: request.body.price,
    quantity: request.body.quantity,
    category: request.body.category,
    size: request.body.size,
    color: request.body.color,
    rate: request.body.rate,
    isFeatured: request.body.isFeatured,
  });
  try {
    const category = await CategorySchema.findById(request.body.category);
    if (!category) throw new Error("Invalid category");
    let data = await productObject.save();
    response.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.UpdateProduct = async (request, response, next) => {
  const file = request.file;
  const fileName = file?.filename;
  try {
    if (request.body.category) {
      const category = await CategorySchema.findById(request.body.category);
      if (!category) throw new Error("Invalid category");
    }
    let data = await ProductSchema.updateOne(
      {
        _id: request.body.id,
      },
      {
        $set: {
          title: request.body.title,
          description: request.body.description,
          richDescription: request.body.richDescription,
          image: `assets/imgs/products/${fileName}`,
          price: request.body.price,
          quantity: request.body.quantity,
          category: request.body.category,
          size: request.body.size,
          color: request.body.color,
          rate: request.body.rate,
          isFeatured: request.body.isFeatured,
        },
      }
    );

    response.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteProduct = (request, response, next) => {
  ProductSchema.deleteOne({ _id: request.params.id })
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getFeatured = async (request, response, next) => {
  try {
    //const count = request.params.count ? request.params.count : 6;
    const Products = await ProductSchema.find({ isFeatured: true }).limit(6);
    response.status(200).json({ Products });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductswithCategoryID = (request, response, next) => {
  ProductSchema.find({ category: request.params.categoryid })
    .populate("category")
    .then((data) => {
      if (data == null) throw new Error("Product doesn't exist");
      else response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
