#include "pebble.h"
#include "enamel.h"
#include <pebble-events/pebble-events.h>

static EventHandle s_window_event_handle;

// Set the maximum no of images - this should be the number of images you have in the resources
static int max_images = 1;
 
// Array to hold the resource ID numbers - need to add each of the IDENTIFIER names you gave to each resource
const int MOCKUP_IMAGE_ID[] = {
  RESOURCE_ID_IMAGE_MOCKUP_1
};


// Integer to hold the number of image we are currently displaying
static int image_no = 0;

// Pointer to main window and layer
static Window *s_main_window;
static Layer *s_main_window_layer;

// Pointer to mockup image and layer
static GBitmap *s_mockup_image;
static BitmapLayer *s_mockup_layer;


static void change_image(){

  //APP_LOG(APP_LOG_LEVEL_DEBUG, "IMAGE: %d", image_no);
  
  bitmap_layer_set_bitmap(s_mockup_layer, NULL);
  gbitmap_destroy(s_mockup_image);
  
  s_mockup_image = gbitmap_create_with_resource(MOCKUP_IMAGE_ID[image_no]);
  
  bitmap_layer_set_bitmap(s_mockup_layer, s_mockup_image);
    
}


// Handle the button clicks
static void select_click_handler(ClickRecognizerRef recognizer, void *context) {

  // Nothing for select to do - could make it display image no
  
}

static void up_click_handler(ClickRecognizerRef recognizer, void *context) {
  
  // decrease to show previous image
  image_no -= 1;
  
  // Check if we are at minimum and loop round by setting to max_images - 1
  if (image_no < 0){
    image_no = max_images - 1;
  }
  
  // Call the function that switches images and displays it on the layer
  change_image();
}


static void down_click_handler(ClickRecognizerRef recognizer, void *context) {  
  
  // increase for next image
  image_no += 1;
  
  // check if we are at maximum and loop round by setting to zero
  if (image_no > max_images - 1){
    image_no = 0;
  }
  
  // Call the function that switches images and displays it on the layer
  change_image();
  
}

static void click_config_provider(void *context) {
  
    // Setup each of the click providers
    window_single_click_subscribe(BUTTON_ID_UP, up_click_handler);
    window_single_click_subscribe(BUTTON_ID_SELECT, select_click_handler);
    window_single_click_subscribe(BUTTON_ID_DOWN, down_click_handler);
}


int get_num_palette_colors(GBitmap *b){

	GBitmapFormat format = gbitmap_get_format(b);

	switch (format) {
		case GBitmapFormat1Bit: return 0;
		case GBitmapFormat8Bit: return 0;
		case GBitmapFormat1BitPalette: return 2;
		case GBitmapFormat2BitPalette: return 4;
		case GBitmapFormat4BitPalette: return 16;

		default: return 0;
	}

}


void replace_gbitmap_color(GColor color_to_replace, GColor replace_with_color, GBitmap *im, BitmapLayer *bml){

	//First determine what the number of colors in the palette
	int num_palette_items = get_num_palette_colors(im);

	#ifdef SHOW_APP_LOGS
	APP_LOG(APP_LOG_LEVEL_DEBUG, "Palette has %d items", num_palette_items);
	#endif

	//Get the gbitmap's current palette
	GColor *current_palette = gbitmap_get_palette(im);

	//Iterate through the palette finding the color we want to replace and replacing 
	//it with the new color
	#ifdef SHOW_APP_LOGS
	APP_LOG(APP_LOG_LEVEL_DEBUG, "--Replace Color Start--");
	#endif 

	for(int i = 0; i < num_palette_items; i++){

		#ifdef SHOW_APP_LOGS
		APP_LOG(APP_LOG_LEVEL_DEBUG, "Palette[%d] = %s (alpha:%d)", i, get_gcolor_text(current_palette[i]),(current_palette[i].argb >>6));
		#endif

		if ((color_to_replace.argb & 0x3F)==(current_palette[i].argb & 0x3F)){

			current_palette[i].argb = (current_palette[i].argb & 0xC0)| (replace_with_color.argb & 0x3F);
			#ifdef SHOW_APP_LOGS
			APP_LOG(APP_LOG_LEVEL_DEBUG, "-------[%d] replaced with %s (alpha:%d)", i, get_gcolor_text(current_palette[i]),(current_palette[i].argb >>6));
			#endif
			
		}

	}

	#ifdef SHOW_APP_LOGS
	APP_LOG(APP_LOG_LEVEL_DEBUG, "--Replace Color End--");
	#endif

	//Mark the bitmaplayer dirty
	if(bml != NULL){
		layer_mark_dirty(bitmap_layer_get_layer(bml));
	}

}

static void change_colors(){
  
  // reload the image to reset the colours
  change_image();
  
  // change to the user chosen colours
  replace_gbitmap_color(GColorBlack, enamel_get_bgcolor(), s_mockup_image, s_mockup_layer);
  replace_gbitmap_color(GColorVividCerulean, enamel_get_resistcolor(), s_mockup_image, s_mockup_layer);
  replace_gbitmap_color(GColorPastelYellow, enamel_get_bordercolor(), s_mockup_image, s_mockup_layer);
  replace_gbitmap_color(GColorCeleste, enamel_get_lcdbgcolor(), s_mockup_image, s_mockup_layer);
  replace_gbitmap_color(GColorOxfordBlue, enamel_get_lcdtextcolor(), s_mockup_image, s_mockup_layer);
  replace_gbitmap_color(GColorWhite, enamel_get_labelcolor(), s_mockup_image, s_mockup_layer);
  replace_gbitmap_color(GColorLimerick, enamel_get_alarmcolor(), s_mockup_image, s_mockup_layer);
  replace_gbitmap_color(GColorBrass, enamel_get_shockcolor(), s_mockup_image, s_mockup_layer);
  replace_gbitmap_color(GColorDarkCandyAppleRed, enamel_get_shockarrowcolor(), s_mockup_image, s_mockup_layer);
  
}


static void enamel_settings_received_window_handler(void *context){
  APP_LOG(0, "Settings received");
  
  change_colors();
                        
}


// WINDOW LOAD
static void main_window_load(Window *window) {

  // Get the root window layer
  s_main_window_layer = window_get_root_layer(s_main_window);

  // Get the size of the main window - as size now different for Rect or Round
  GRect s_main_window_layer_frame = layer_get_frame(s_main_window_layer);
  
  // Create the layer that will hold the mockup bitmap image
  s_mockup_layer = bitmap_layer_create(s_main_window_layer_frame);

  // Set the bitmap layer to align the image in the center - useful if using the same 144x168 rect image on round
  bitmap_layer_set_alignment(s_mockup_layer, GAlignCenter);
  
  // Add the mockup window to the main window
  layer_add_child(s_main_window_layer, bitmap_layer_get_layer(s_mockup_layer));
  
  // Load the first image
  change_image();
  
  change_colors();
  
}


// WINDOW UNLOAD
static void main_window_unload(Window *window) {

  //Destroy the mockup layer and image
  layer_remove_from_parent(bitmap_layer_get_layer(s_mockup_layer));
  bitmap_layer_destroy(s_mockup_layer);
  gbitmap_destroy(s_mockup_image);
  s_mockup_image = NULL;
    
}


// INIT
static void init(void) {

  // Create main Window
  s_main_window = window_create();
    
  // Handle clicks
  window_set_click_config_provider(s_main_window, click_config_provider);
  
  // Set handlers to manage the loading and unloading of elements inside the Window
  window_set_window_handlers(s_main_window, (WindowHandlers) {
    .load = main_window_load,
    .unload = main_window_unload
  });

  // Show the Window on the watch, with animated=true
  window_stack_push(s_main_window, true);
    
  
  // Initialize Enamel to register App Message handlers and restores settings
  enamel_init();
  
   // Subscribe a handler for a window
  s_window_event_handle = enamel_settings_received_subscribe(enamel_settings_received_window_handler, s_main_window);
  
  // call pebble-events app_message_open function
  events_app_message_open(); 
  
}


// DEINIT
static void deinit(void) {

  // Unsubscribe from Enamel events
  enamel_settings_received_unsubscribe(s_window_event_handle);
  
  // Deinit Enamel to unregister App Message handlers and save settings
  enamel_deinit();
  
  // Destroy the main window
  window_destroy(s_main_window);
  
}


// MAIN PROGRAM LOOP
int main(void) {
  init();
  app_event_loop();
  deinit();
}