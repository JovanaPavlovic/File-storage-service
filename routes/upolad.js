const express = require("express");
const multer = require("multer");

const router = express.Router();

//Disk storage

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//Filtering files by MIME type

/* const fileFilter = () => {
  if (
    mimetype === "image/png" ||
    mimetype === "image/jpg" ||
    mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
 */

const upload = multer({ storage: fileStorage /* , fileFilter: fileFilter  */ });

//UPLOAD ONE FILE

router.post("/upload", upload.single("image"), (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const file = req.file;

  if (!file || file.length === 0) {
    return res.json({
      status: 400,
      message: "File doesen't exist or empty.",
    });
  }

  //console.log(title, description, file);

  res.sendStatus(200);
});

//UPLOAD MULTIPLE FILES

router.post("/upload/files", upload.array("file", 12), (req, res, next) => {
  const files = req.files;
  const title = req.body.title;
  const description = req.body.description;

  //console.log(files);

  if (files.length === 0) {
    return res.json({
      status: 400,
      message: "Files array is empty.",
    });
  }

  res.sendStatus(200);
});

module.exports = router;
