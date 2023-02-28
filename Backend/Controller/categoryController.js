const mongoose = require("mongoose");
require("../Model/category");
const multer = require("multer");
const CategorySchema = mongoose.model("category");

module.exports.getAllCategories = (request, response, next) => {
  CategorySchema.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getCategorytById = (request, response, next) => {
  CategorySchema.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) throw new Error("User not found");
      else response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//Upload image 
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('invalid image type');

      if(isValid) {
          uploadError = null
      }
    cb(uploadError, './../Frontend/src/assets/categoryicons')
  },
  filename: function (req, file, cb) {
      
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
})
module.exports.uploadOptions = multer({ storage: storage })


module.exports.addCategory = (request, response, next) => {
  const file = request.file;
  const fileName = file.filename
  let categoryObject = new CategorySchema({
    name: request.body.name,
    icon: `assets/categoryicons/${fileName}`,
  });
  categoryObject
    .save()
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteCategory = (request, response, next) => {
  CategorySchema.deleteOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

///////////////////////////////////////////////////////////////////to DO
module.exports.updatecategory = (request, response, next) => {
  const file = request.file;
  const fileName = file.filename
  CategorySchema.updateOne(
    { _id: request.body.id },
    {
      $set: {
        name: request.body.name,
        icon: `assets/categoryicons/${fileName}`,
      },
    }
  )
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

/*//Update product
module.exports.updateCategory = async (request, response, next) => {
  try {
    let data = await CategorySchema.updateOne(
      { _id: request.body._id },
      request.body
    );
    if (data.matchedCount == 0) {
      throw new Error("Category is Not Founded");
    } else {
      response.status(200).json({ data });
    }
  } catch (error) {
    next(error);
  }
};
*/
