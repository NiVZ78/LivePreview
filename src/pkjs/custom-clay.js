// custom-function.js
module.exports = function() {
  
  var clayConfig = this;
  
  // An Image object that will be used to draw on the canvas
  var img = new Image();
  
  // Base 64 encoded png data of the original unique colored image
  var imgB64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACoCAMAAAA4sZdKAAAALHRFWHRDcmVhdGlvbiBUaW1lAEZyaSAxNSBKYW4gMjAxNiAwMDoxMDoxMSAtMDAwMClg0tQAAAAHdElNRQfgBQoMBSrSGxrBAAAACXBIWXMAAAsRAAALEQF/ZF+RAAAABGdBTUEAALGPC/xhBQAAABtQTFRFAAAAqqpVqgAAqqoA//////+qqv//AABVAKr/DyPRhQAABMNJREFUeNrtnIuaoyAMRunWEd//iXcqJCQhXFQKtkO2q3IRjj8B0W/QmGl/z5bEfgLdB2h5WdgvRu5Jnj48bpPckzx9gPw2t19Izn5AznSgpWObcQCTUaiTMZ8xuk91c2ivAellS9TrDMZ1bbIb2QSa9nm2wc9sbvNrbOuz4SHLBmGMcju/N7gnJVUDeSzHBklwyMIhm6uLpdJQCJpanP0C3aWKmsjFggDkAoDby4AKBTE2KHPbjgFJqYVCtKDNxNk2QzXZhKJ6OeU2i5pr2/DSyfWzZlSBzEaFguBBhaZN+37zk2f+PCGmZ2afB/jHIJmh8bwW56r7ZJFWzCta+M+IB5CG8xbyJEiqxClryGb8lDoGaj+jDSjk8QerDeAS9R0K4TOzB0I+WZEP8ZQ3+NC0aVX2M9Q0nMFq3AknQhiPIyj80TrMGAagjcMBJJToBjyeiAjUokx72jyRl6iVQPbaqUGiRgJd4EGig0BEXyXcH8iugseHbQrolbb/1BiWeg5oJ4jClpTZFYipQ8J3A7JpoAPWBwiVKMd/C5AaHge08m6P4WS3P2Anuz0fGG1pYHz3OAQCWT08AAgosHAeHgNkiS+zTjbi5noUiPamuGexmAn0PqBVAK1jfYjONo71srhnNRuHZP11A+MbgORAraneWaEC8NWTvx7o6nNZe6CLT65vALpoE2gCTaAJNNo+BEiO5+nIirQmCpHibT6yIs1luAYU3hyqrxMVIXJpayr2ANAaireFyIq0tb4tC06tekXOVWwO9jqQ6qY537XpK5hANwCqhp1Anw0kbzEi3N2pLYRkuAooPSanFC8O1O7VCX1/ws/J38tW+XZJiaxII7E2gFgWzgPhvdtGVaYlqHJdK0DqgKxVKlAjK9KuA1lSgVrrGs9ucmlY6kkglyUtRGj/6jT2ov0UUFb3XAY9jfZ6cRBlTwDliK4BiTa0a3Ecei+QnpYdqUtAF+8cQqGQarNAJYFOA0lfinyrM1Cqk9mvBKpO6wF0KI0PQ6eAMjwjgFIlQ//MVKrDxkDR7CMDhI0uisbIpDPraRLIbeidg4T1u71VgGikrDOXBjngAF3cqmFdoRJRZjpUfBcji46q+pA3aBNoAp0EuondGKiB3jfzodZA8Xth9a7WAChZOGmyn7sAwZ+cS4mGANHu1eJv8q+fT5ctNFi1cPVsPv7cbl3H7Va+jEdKLFe60+qpaR9u2qJj+aEjWIQbLaiVwejbSCeWmML3cfCLPvApKFydDOmLerK4OLNcBvIlhE8MARAI47+hg+gaEJTBTjGnlikLhdhS5AVXGy/6148ioLA4+PQyZaEQ04Y0XsKHogZaOMBcpjxtWoU9KqwvT5s8lfb0/+Hw115b4zdY1y7D6/CxHxu/9TEulzt3L8mVY7C0JxRd5nkCEB4+OZDYPuQWk55QiNw+4diUiRJA/l9A8XoQnR4hmgA5ISTWsxoonMek3vccSNNGUUiWcxgIL0deGQpHXCjjQ9km25v/kEKxyBKoaNKpDTiy39c6dV1NIFDYGdz7UajfSAQNEvzYbx80Q3egIE1wHt/DxgAxTbhaI4HQayA0RKGqqnreXp0Q/5JmyHh9A6QBODmkQTgBqTa6F9LgqeK08fYfoowmy05YsHUAAAAASUVORK5CYII=";

  // Set the img source to the base64 encoded image data
  img.src = imgB64;
  
  // Object to hold key value pairs describing the original image that uses unique colors for each changeable color
  var originalColor = {
    'bgcolor'          : 0x000000, 
    'resistcolor'      : 0x00aaff,
    'bordercolor'      : 0xffffaa,
    'lcdbgcolor'       : 0xaaffff,
    'lcdtextcolor'     : 0x000055,
    'labelcolor'       : 0xffffff,
    'alarmcolor'       : 0xaaaa00,
    'shockcolor'       : 0xaaaa55,
    'shockarrowcolor'  : 0xaa0000
    };
  
  // Empty object that will hold the key value pairs from the Clay color pickers
  var customColor = {};
    
  // (nested) function that is called to redraw the color corrected image to the canvas whenever any color picker is changed
  function updateCanvas(){
    
    // Get a handle to our canvas element
    var canvas = clayConfig.getItemById('canvas').$element.select('canvas')[0];
    // Get a drawing context
    var ctx = canvas.getContext("2d");
    
    // Set the image back to the original unique colored image so we always start from a known point
    img.src = imgB64;
    
    // Draw the unique colored image to the canvas
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Read the image data from the canvas
    var imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
    
    // Get the pixel data from the image data
    var pixelData = imgData.data;

    // Loop through the pixel data
    for(var i=0; i<pixelData.length; i+=4) {
      // Get the individual RGB values of the pixel
      var red   = pixelData[i];
      var green = pixelData[i+1];
      var blue  = pixelData[i+2];
      
      // Convert the RGB values to HEX
      var pixelColor = ((red & 0xFF) << 16) + ((green & 0xFF) << 8) + (blue & 0xFF);

      // Loop through the original colored image values
      for (var key in originalColor){
        
        // Check if the current original color matches the current pixel
        if (originalColor[key] == pixelColor){
          
          // Swap the current canvas pixel color with the color from the corresponding color picker
          pixelData[i]   = (customColor[key] >> 16) & 0xFF;
          pixelData[i+1] = (customColor[key] >>  8) & 0xFF;
          pixelData[i+2] = (customColor[key] >>  0) & 0xFF;
          
          // Exit the loop now we have found a match
          break;
        }
      }
    }
    
    // Put the color swapped image data back to the canvas
    ctx.putImageData(imgData, 0, 0);
    
  }  
  
  
  // Function to modify HTML after Clay config has loaded
  clayConfig.on(clayConfig.EVENTS.AFTER_BUILD, function() {
    
    // Loop through all the color pickers
    clayConfig.getItemsByType('color').forEach(function(item) {
        
      // Store the colour pickers color
      customColor[item.messageKey] = item.get();
      
      // Set the color picker onchange event to
      item.on('change', function(){
        // Store the new color
        customColor[item.messageKey] = item.get();  
        
        // Update the canvas
        updateCanvas();           
        
      });
    });
     
    // Do an initial draw
    updateCanvas(); 
    
    // Force an initial canvas draw when the img data has loaded
    //window.onload = function(){
      //updateCanvas();
    //};   
  });  
      
};