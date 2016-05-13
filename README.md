# LivePreview

Two methods (in seperate branches) for providing Live Previews of your watchface/watchapp to the user when allowing them to use custom color pickers.

PNG Method by @NiVZ
SVG Method Method by @Gregoiresage

Brief Instructions - These will be updated later

To use the PNG version you will need:

- Your favourite image editing program
- Program or website to convert PNG to Base 64
- Cloudpebble or Local SDK

1. First take a screenshot of your watchface/watchapp and save as a .png
2. Load it into your favourite image editing software
3. You need to give each element that can be colored seperately a unique color (eg background RED, hour hand GREEN, minute hand BLUE)
4. If multiple elements need to be set using the same color picker (eg button labels for Light, Prev, Next then make these the same color)
5. Save the image
6. Convert the image to Base 64
7. Open your project in Cloudpebble or Local SDK
8. Create your Clay configuration as normal, but make sure to add the following section above your color pickers:
{
    "type": "text",
    "id": "canvas",
    "defaultValue": '<canvas id="canvas" width="144" height="168" ></canvas>'
}
9. Edit the custom-clay.js
10. Replace the imgB64 string with the string for your Base 64 encoded image
11. Edit the 'originalColor' object giving it the KEY name for your clay config color pickers, and the hex code of the unique color you used to identify that element in the Base 64 encoded image.

That's it!


How it works:

The PNG method works by always loading your unique colored image so it has a known starting point
It then loops through every individual pixel of the unique colored image and compares it to the colors you specified in the 'originalColor' object.
When it finds a match it now has the name of the KEY
It then gets the currently selected color from the picker with the matching KEY name and replaces the pixel color
Once all pixels have been done the whole image is redrawn back to the canvas
This function is triggered onload and whenever a color picker value is changed
