var weather  = require( '../controllers/weather' )

var express  = require( 'express' )
var router   = express.Router()

router.get( '/' , weather.index )
router.get( '/ajax/weather' , weather.getlog )
router.get( '/upload' , weather.upload )
router.post( '/upload' , weather.importfile )

module.exports = router
