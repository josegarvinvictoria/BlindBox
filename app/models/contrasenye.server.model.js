'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contrasenye Schema
 */
var ContrasenyeSchema = new Schema({
	nomservei: {
		type: String,
		default: '',
		required: 'Especifica el nom del servei',
		trim: true
	},
    url: {
		type: String,
		default: '',
		required: 'Especifica l\'URL',
		trim: true
	},
    nomusuari: {
		type: String,
		default: '',
		required: 'Especifica un nom d\'usuari',
		trim: true
	},
   contrasenya: {
		type: String,
		default: '',
		required: 'Especifica una contrasenya',
		trim: true
	},
    observacions: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Contrasenye', ContrasenyeSchema);