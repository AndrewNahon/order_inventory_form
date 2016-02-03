var inventory;

(function() {
  inventory = {
    last_id: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      $("#order_date").text(date.toUTCString());
    },
    cacheTemplate: function() {
      var i_template = $("#template");
      this.template = i_template.html();
    },
    add: function() {
      this.last_id++;
      var item = {
        id: this.last_id,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    findParent: function(e) {
      return $(e.target).closest("tr");
    },
    findID: function($item) {
      return +$item.find("input[type=hidden]").attr("id");
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;
      this.collection.forEach(function(item) {
        if (id === item.id) {
          found_item = item;
          return false;
        }
      });
      return found_item;
    },
    addItem: function(e) {
      e.preventDefault();

      var item = this.add(),
          $item = $(this.template.replace(/ID/g, item.id));

      $("#inventory").append($item);
    },
    deleteItem: function(e) {
      e.preventDefault();
      var $item = this.findParent(e).remove();
      this.remove(this.findID($item));
    },
    updateItem: function(e) {
      var $item = this.findParent(e),
          id = this.findID($item),
          item = this.get(id);
          
        item.name = $item.find("input[id^=name]").val();
        item.stock_number = $item.find("input[id^='stock']").val();
        item.quantity = $item.find("input[id^='quantity']").val();
    },
    bindEvents: function() {
      $("#add_item").on("click", $.proxy(this.addItem, this));
      $("#inventory").on("click", "a", $.proxy(this.deleteItem, this));
      $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }  
  };
})();

$($.proxy(inventory.init, inventory));