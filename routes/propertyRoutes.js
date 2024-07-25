const express = require('express');
const auth = require('../middleware/auth')
const propertyRouter = express.Router()
const propertyController = require('../controllers/propertyController')


propertyRouter.post('/createproperty',auth.isAuth,propertyController.createProperty)
propertyRouter.get('/myproperty',auth.isAuth,propertyController.myProperty)
propertyRouter.get('/myproperty/:id', auth.isAuth, propertyController.myPropertyById)
propertyRouter.put('/editproperty',auth.isAuth,propertyController.editProperty)
propertyRouter.delete('/deleteproperty',auth.isAuth,propertyController.deleteProperty)
propertyRouter.get('/allproperty',auth.isAuth,propertyController.allProperty)
propertyRouter.get('/propertyfilter',auth.isAuth,propertyController.propertyFilter)

module.exports = propertyRouter