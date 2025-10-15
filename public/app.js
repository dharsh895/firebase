// public/app.js
var app = angular.module("shoppingApp", []);

app.controller("CartController", function($scope, $http) {
  $scope.cart = [];
  $scope.user = {};
  $scope.item = {};
  $scope.editMode = false;
  let editId = null;

  // Fetch all items
  const loadItems = () => {
    $http.get("/api/cart").then(res => $scope.cart = res.data);
  };

  // Add or update
  $scope.addOrUpdateItem = () => {
    const data = {
      name: $scope.user.name,
      gmail: $scope.user.gmail,
      item: $scope.item.item,
      quantity: $scope.item.quantity,
      price: $scope.item.price
    };

    if ($scope.editMode) {
      $http.put("/api/cart/" + editId, data).then(() => {
        $scope.editMode = false;
        $scope.item = {};
        loadItems();
      });
    } else {
      $http.post("/api/cart", data).then(() => {
        $scope.item = {};
        loadItems();
      });
    }
  };

  // Edit
  $scope.editItem = (c) => {
    $scope.user.name = c.name;
    $scope.user.gmail = c.gmail;
    $scope.item.item = c.item;
    $scope.item.quantity = c.quantity;
    $scope.item.price = c.price;
    $scope.editMode = true;
    editId = c._id;
  };

  // Delete
  $scope.deleteItem = (id) => {
    $http.delete("/api/cart/" + id).then(() => loadItems());
  };

  loadItems();
});
