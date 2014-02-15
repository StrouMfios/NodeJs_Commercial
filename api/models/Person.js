/**
 * Person
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var Person = {

  attributes: {
  	
  	id: {
  		type: 'integer',
  		primaryKey:true
  	},
  	firstName: 'string',
  	lastName: 'string',
  	age: {
  		type: 'integer',
  		max: 99,
  		required:true
  	},
  	email: {
  		type:'email',
  		required:true
  	},
  	orderID: {
  		type: 'integer'
  	}
  }

};

module.exports = Person;
