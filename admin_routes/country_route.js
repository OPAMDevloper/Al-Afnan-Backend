const countryContrller = require('../admin_controller/country_controller');
const { authenticationVerifier } = require('../middlewares/verifyToken');

const router = require('express').Router();



router.post('/create', authenticationVerifier, countryContrller.create);
router.post('/update/:id', authenticationVerifier, countryContrller.updatecountry);
router.delete('/delete/:id', authenticationVerifier, countryContrller.deletecountry);
router.get('/all', authenticationVerifier, countryContrller.getAllCategories);
router.get('/show/:id', authenticationVerifier, countryContrller.getcountryById);

module.exports = router;