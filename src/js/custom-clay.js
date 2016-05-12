// custom-function.js
module.exports = function(minified) {
 
  var clayConfig = this;
 
  function cssColor(color) {
    return '#' + ('000000' + color.toString(16)).substr(-6);
  }
 
  function colorChanged() {
    var item=minified.$('#'+this.id)[0];
    if(item){
      var color=cssColor(this.get());
      item.style.fill=color;
    }
  }
 
  clayConfig.on(clayConfig.EVENTS.AFTER_BUILD, function() {
    // loop through all the color pickers
    clayConfig.getItemsByType('color').forEach(function(item) {
      colorChanged.call(item);
      item.on('change', colorChanged);
    });
  }); 
 
}