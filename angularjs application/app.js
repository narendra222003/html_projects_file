// Define the AngularJS module
angular.module('myApp', [])
.controller('MainController', function() {
    var vm = this;
    vm.greeting = "Welcome to the AngularJS Application!";
    vm.newItem = "";
    vm.items = [
        { text: "Item 1", editing: false },
        { text: "Item 2", editing: false },
        { text: "Item 3", editing: false }
    ];

    vm.addItem = function() {
        if (vm.newItem && vm.newItem.trim()) {
            vm.items.push({ text: vm.newItem, editing: false });
            vm.newItem = "";
        }
    };

    vm.editItem = function(index) {
        vm.items[index].editing = true;
        vm.items[index].newText = vm.items[index].text;
    };

    vm.updateItem = function(index) {
        if (vm.items[index].newText && vm.items[index].newText.trim()) {
            vm.items[index].text = vm.items[index].newText;
            vm.items[index].editing = false;
        }
    };

    vm.removeItem = function(index) {
        vm.items.splice(index, 1);
    };
});
