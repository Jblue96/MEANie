var myApp = angular.module('myApp', []);
myApp.controller('WhereMyPeeps', function($http)
{
  //var global to this controller
  var vm = this;
  vm.peeps = [], //array attached to controller

  vm.addRecord = function() {
    var objectToSend = {
      name: vm.nameIn,
      location: vm.locationIn,
    };
    console.log("in Object to Send-->", objectToSend);
    $http({
      method: 'POST',
      url: '/testPost',
      data: objectToSend
    }).then( function( response ){
     console.log( 'back from server:', response );
     vm.getItems();
   }); //end http
   // empty inputs
    vm.nameIn = '';
    vm.locationIn = '';
  }; // end add record


  vm.getRecords = function() {
    console.log("in getRecords");
    $.http({
        method: 'GET',
        url: '/testPost',
      }).then(function(response) {
        console.log('resp:',response);
        vm.allTheRecords = response.data;
        console.log(vm.allTheRecords);
      });//end
      function myError(response) {
        console.log(response.statusText);
      } //end error
  };// end get Records
