const express = require('express')
const router = express.Router()
// multer
const upload = require('../multerConfig')
const { getUsers, PostUser, updateUser, deleteUser } = require('../controller/users')


const pathUser = 'users'


router.get(`/${pathUser}`,getUsers)
router.post(`/${pathUser}`,upload.single('image'),PostUser)
router.put(`/${pathUser}/:id`,updateUser )
router.delete(`/${pathUser}/:id`,deleteUser)


module.exports = router