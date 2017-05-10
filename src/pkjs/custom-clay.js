// custom-function.js
module.exports = function() {
  
  var clayConfig = this;
  
  // Function to convert to Sunny colors
  var GColor=(function(){var mappingSunny={'000000':'000000','000055':'001e41','0000aa':'004387','0000ff':'0068ca','005500':'2b4a2c','005555':'27514f','0055aa':'16638d','0055ff':'007dce','00aa00':'5e9860','00aa55':'5c9b72','00aaaa':'57a5a2','00aaff':'4cb4db','00ff00':'8ee391','00ff55':'8ee69e','00ffaa':'8aebc0','00ffff':'84f5f1','550000':'4a161b','550055':'482748','5500aa':'40488a','5500ff':'2f6bcc','555500':'564e36','555555':'545454','5555aa':'4f6790','5555ff':'4180d0','55aa00':'759a64','55aa55':'759d76','55aaaa':'71a6a4','55aaff':'69b5dd','55ff00':'9ee594','55ff55':'9de7a0','55ffaa':'9becc2','55ffff':'95f6f2','aa0000':'99353f','aa0055':'983e5a','aa00aa':'955694','aa00ff':'8f74d2','aa5500':'9d5b4d','aa5555':'9d6064','aa55aa':'9a7099','aa55ff':'9587d5','aaaa00':'afa072','aaaa55':'aea382','aaaaaa':'ababab','ffffff':'ffffff','aaaaff':'a7bae2','aaff00':'c9e89d','aaff55':'c9eaa7','aaffaa':'c7f0c8','aaffff':'c3f9f7','ff0000':'e35462','ff0055':'e25874','ff00aa':'e16aa3','ff00ff':'de83dc','ff5500':'e66e6b','ff5555':'e6727c','ff55aa':'e37fa7','ff55ff':'e194df','ffaa00':'f1aa86','ffaa55':'f1ad93','ffaaaa':'efb5b8','ffaaff':'ecc3eb','ffff00':'ffeeab','ffff55':'fff1b5','ffffaa':'fff6d3'};return{fromHex:GColorFromHex,toHex:GColorToHex,toName:GColorName,shortHex:GColorShortHex,expandHex:GColorExpandHex,toSunny:GColorToSunny,toSunnyHex:HexToSunnyHex,ArmyGreen:212,BabyBlueEyes:235,Black:192,Blue:195,BlueMoon:199,Brass:233,BrightGreen:220,BrilliantRose:246,BulgarianRose:208,CadetBlue:218,Celeste:239,ChromeYellow:248,CobaltBlue:198,Cyan:207,DarkCandyAppleRed:224,DarkGray:213,DarkGreen:196,DukeBlue:194,ElectricBlue:223,ElectricUltramarine:211,FashionMagenta:242,Folly:241,Green:204,Icterine:253,ImperialPurple:209,Inchworm:237,Indigo:210,IslamicGreen:200,JaegerGreen:201,JazzberryJam:225,KellyGreen:216,LavenderIndigo:231,Liberty:214,LightGray:234,Limerick:232,Magenta:243,Malachite:205,MayGreen:217,MediumAquamarine:222,MediumSpringGreen:206,Melon:250,MidnightGreen:197,MintGreen:238,Orange:244,OxfordBlue:193,PastelYellow:254,PictonBlue:219,Purple:226,Purpureus:230,Rajah:249,Red:240,RichBrilliantLavender:251,RoseVale:229,ScreaminGreen:221,ShockingPink:247,SpringBud:236,SunsetOrange:245,TiffanyBlue:202,VeryLightBlue:215,VividCerulean:203,VividViolet:227,White:255,WindsorTan:228,Yellow:252};function GColorFromHex(hex){var hexNum=parseInt(hex,16);var a=192;var r=(((hexNum>>16)&0xFF)>>6)<<4;var g=(((hexNum>>8)&0xFF)>>6)<<2;var b=(((hexNum>>0)&0xFF)>>6)<<0;return a+ r+ g+ b;}
    function GColorToHex(color){var r=(color&48)>>4;var g=(color&12)>>2;var b=(color&3)>>0;var hexString=[r,g,b].map(function(x){x*=5;return x.toString(16)+ x.toString(16);}).join('');return hexString.toUpperCase();}
    function GColorName(color){var names=Object.keys(GColor);for(var n=0;n<names.length;n+=1){if(GColor[names[n]]==color){return names[n];}}
    return null;}
    function GColorShortHex(hex){return Number(GColorFromHex(hex)).toString(16).toUpperCase();}
    function GColorExpandHex(hex){return GColorToHex(parseInt(hex,16));}
    function GColorToSunny(color){return GColorFromHex(mappingSunny[GColorToHex(color).toLowerCase()]);}
    function HexToSunnyHex(hex){return mappingSunny[hex.toLowerCase()];}}());
      
  
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
                    
          /* Want to try and convert the color we have stored in the picker into the SUNNY color */
          var sunny = customColor[key];
          sunny = ("000000" + sunny.toString(16)).substr(-6);
          sunny = GColor.toSunnyHex(sunny);
          sunny = parseInt(sunny,16);          
          
          // Swap the current canvas pixel color with the color from the corresponding color picker
          pixelData[i]   = (sunny >> 16) & 0xFF;
          pixelData[i+1] = (sunny >>  8) & 0xFF;
          pixelData[i+2] = (sunny >>  0) & 0xFF;
          
          
          
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
    //updateCanvas(); 
    
    // Force an initial canvas draw when the img data has loaded
    window.onload = function(){
      updateCanvas();
    };   
  });  
      
};