/**
 * User: thomas.vo
 * Date: 1/22/14
 * Time: 2:07 AM
 *
 */

var mongoose = require('mongoose');
var Title = mongoose.model('Title', new mongoose.Schema({},{strict:false}));
module.exports = Title;