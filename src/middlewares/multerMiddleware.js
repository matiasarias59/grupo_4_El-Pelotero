const multer = require('multer');
const path = require('path');


const storageProfilePic = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/users/profile') )
    },
    filename: (req, file, cb) => {
        const name = `img_${Date.now()}${path.extname(file.originalname)}`
        cb(null, name)
    }
})

const storageProductPic = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/products') )
    },
    filename: (req, file, cb) => {
        const name = `img_${Date.now()}${path.extname(file.originalname)}`
        cb(null, name)
    }
})

const uploadProfilePic = multer({storage: storageProfilePic});

const uploadProductPic = multer({storage: storageProductPic});

module.exports = {uploadProfilePic, uploadProductPic};