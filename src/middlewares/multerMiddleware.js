const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/users') )
    },
    filename: (req, file, cb) => {
        const name = `img_${Date.now()}${path.extname(file.originalname)}`
        cb(null, name)
    }
})

const upload = multer({storage: storage});

module.exports = upload;