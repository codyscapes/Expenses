var Category = {
  allCategories: [],
  createCat: function (catName) {
    var category = Object.create(Category);
    category.initializeCat(catName);
    category.purchases = [];
    return category
  },
  initializeCat: function(catName) {
    this.catName = catName
    this.allCategories.push(catName);
    return this.catName;
  }
}

var Purchase = {
  create: function(itemName, itemCost) {
    var purchase = Object.create(Purchase);
    purchase.initialize(itemName, itemCost);
    return purchase;
  },
  initialize: function(itemName, itemCost) {
    this.itemName = itemName;
    this.itemCost = itemCost;
    //this.itemsArray = [];
    return this.purchase
  },

  itemDisplay: function() {
    return this.itemName + " - $" + parseInt(this.itemCost).toFixed(2);
  }
};

$(document).ready(function () {

  $('#newItemContainer').hide();

  var currentCategory;
  var currentDiv;

  $("#newCategoryForm").submit(function() {
    event.preventDefault();

    var categoryName = $(".categoryInput").val();

    var newCategory = Category.createCat(categoryName);
    $('#displayCategories').append('<li class="categoryListItem">' + newCategory.initializeCat(categoryName)+ '<ul></ul></li>');
    currentCategory = newCategory;

    $('.categoryListItem').last().click(function() {
      currentCategory = newCategory;
      currentDiv = $(this);

    $('#current-category').text(currentCategory.catName);

    $('.expensesTable').empty()
    currentCategory.purchases.forEach(function(curItem) {
      $('.expensesTable').append('<li>' + curItem.itemDisplay() + '</li>');
    });

      //console.log(currentCategory);
    });
    //$('#listSelect').append('<option>' + newCategory.initializeCat(categoryName)+ '</option>');
    /*newCategory.allCategories.forEach(function(curCat) {
      $('#displayCategories').append('<li>' + curCat.initializeCat(categoryName) + '</li>');
    });*/

    this.reset();
  });

  $('#displayCategories').on('click','li',function() {
    if($('#newItemContainer').is(':hidden')) {
      $('#newItemContainer').show();
    }
  })



  // Purchase Expense
  $("#newItemForm").submit(function() {
    event.preventDefault();

    //$('.newItem').each(function() {
    var itemName = $(".itemNameInput").val();
    var itemCost = $(".itemCostInput").val();
    var newItem = Purchase.create(itemName, itemCost);
    currentCategory.purchases.push(newItem)
    //});

    //$('#displayExpenses').empty();
/*
    console.log('#' + currentCategory.catContainer(currentCategory.catName) + ' ul');
    $(currentDiv + ' > ul').remove();
    $('#' + currentCategory.catContainer(currentCategory.catName) + ' ul').append('<li>' + newItem.itemDisplay() + '</li>');
*/
    $('.expensesTable').empty()
    currentCategory.purchases.forEach(function(curItem) {
      $('.expensesTable').append('<li>' + curItem.itemDisplay() + '</li>');
    });

    this.reset();
  });

  /*$("#addMoreItems").click(function() {
    $(this).prev().clone().find('input:text').val('').end().insertBefore($(this));
  })*/

})

