In this project I made an inventory order form using html, css, javascript, and jQuery.
It has the following functionality:
1. The order date is automatically printed.
2. New order items are added by pressing the Add Item button.
3. Items are stored on a js object and automatically updated.


A couple things to note:
1.The entire functionality is contained in an inventory object
defined outside of the jQuery window ready function. 

var inventory;

(function() {
  inventory = {
    //code 
})();

$($.proxy(inventory.init, inventory));

2. For this reason, it was necessary to use the $.proxy method for the
inventory initialize method. There are many uses of this within the initialize method
and if we didn't specify the context for the method, this would refer to the window object.

3. This project demonstrates the importance of abstracting complicated code into separate functions. 