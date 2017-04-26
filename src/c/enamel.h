/**
 * This file was generated with Enamel : http://gregoiresage.github.io/enamel
 */

#ifndef ENAMEL_H
#define ENAMEL_H

#include <pebble.h>

// -----------------------------------------------------
// Getter for 'bgcolor'
GColor enamel_get_bgcolor();
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'resistcolor'
GColor enamel_get_resistcolor();
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'bordercolor'
GColor enamel_get_bordercolor();
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'lcdbgcolor'
GColor enamel_get_lcdbgcolor();
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'lcdtextcolor'
GColor enamel_get_lcdtextcolor();
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'labelcolor'
GColor enamel_get_labelcolor();
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'alarmcolor'
GColor enamel_get_alarmcolor();
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'shockcolor'
GColor enamel_get_shockcolor();
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'shockarrowcolor'
GColor enamel_get_shockarrowcolor();
// -----------------------------------------------------

void enamel_init();

void enamel_deinit();

typedef void* EventHandle;
typedef void(EnamelSettingsReceivedHandler)(void* context);

EventHandle enamel_settings_received_subscribe(EnamelSettingsReceivedHandler *handler, void *context);
void enamel_settings_received_unsubscribe(EventHandle handle);

#endif