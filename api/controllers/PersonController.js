/**
 * PersonController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 var async = require('async'),
    _ = require('lodash');

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/person/create`
   */
   create: function (req, res) {
    Person.create({
      firstName: 'Fanis',
      lastName: 'Prodromou',
      email: 'prodromouf@gmail.com',
      age: 30
    }).done(function(err,person){
      if(err){
        console.log(err);
        return res.send(err);        
      }else{
        console.log('person created:',person);
        return res.send('person created');
      }
    });

    // Send a JSON response
    /*return res.json({
      hello: foo
    });*/


  },


  /**
   * Action blueprints:
   *    `/person/destroy`
   */
   destroy: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },

  testMetod: function(req, res){

    var query = 'select * from person';

    Person.query(query,function(err,data){
      if(err)
        res.send(err);

    var d = _.map(data, function(dat) {
      return new Person._model(dat);
    });

      console.log(d);
    });

    return res.send('Test');
  },

  index: function(req,res){

    async.auto({

      orders: function(cb){
        Orders.find()
          .exec(cb);
      },

      people: ['orders',function(cb,async_data){

        var orders = async_data.orders.map(function(item){
          return item.id;
        });

        Person.find()
          .where({orderID:orders})
          .exec(cb);
      }]

    },

    function allDone(err,async_data){

      if(err) return res.serverError(err);

      var orders = async_data.orders;
      var people = async_data.people;

      _.map(people,function(person) {

          var theseOrders =
            _.where(orders, {id:person.orderID});

          person.orders = theseOrders;
      });

       res.json({
          people: people
       });

    });

  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PersonController)
   */
  _config: {}

  
};
