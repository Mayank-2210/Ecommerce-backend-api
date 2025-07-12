const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){                           //deciding where to store the uploaded file.
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){                                //changing the filename of image to unique
        const ext = path.extname(file.originalname);               // Gives the extension of image
        cb(null, 'product-' + Date.now() + ext);
    }
});

const fileFilter = (req,file,cb)=>{
    const allowedTypes = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;                   // tells the file type

    if(allowedTypes.test(ext) && allowedTypes.test(mime)){
        cb(null,true);
    }
    else{
        cb(new Error('Only JPG and PNG files are allowed.'));
    }
};

const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize: 1024 * 1024 * 5}
});

module.exports = upload;