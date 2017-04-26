/**
 * This file was generated with Enamel : http://gregoiresage.github.io/enamel
 */

#include <pebble.h>
#include <@smallstoneapps/linked-list/linked-list.h>
#include <pebble-events/pebble-events.h>
#include "enamel.h"

#ifndef ENAMEL_MAX_STRING_LENGTH
#define ENAMEL_MAX_STRING_LENGTH 100
#endif

#define ENAMEL_PKEY 3000000000
#define ENAMEL_DICT_PKEY (ENAMEL_PKEY+1)

typedef struct {
	EnamelSettingsReceivedHandler *handler;
	void *context;
} SettingsReceivedState;

static LinkedRoot *s_handler_list;

static EventHandle s_event_handle;

static DictionaryIterator s_dict;
static uint8_t* s_dict_buffer = NULL;
static uint32_t s_dict_size = 0;

static bool s_config_changed;

// -----------------------------------------------------
// Getter for 'bgcolor'
GColor enamel_get_bgcolor(){
	Tuple* tuple = dict_find(&s_dict, 1727354161);
	return tuple ? GColorFromHEX(tuple->value->int32) : GColorFromHEX(0x000000);
}
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'resistcolor'
GColor enamel_get_resistcolor(){
	Tuple* tuple = dict_find(&s_dict, 2289530204);
	return tuple ? GColorFromHEX(tuple->value->int32) : GColorFromHEX(0x00aaff);
}
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'bordercolor'
GColor enamel_get_bordercolor(){
	Tuple* tuple = dict_find(&s_dict, 4048477760);
	return tuple ? GColorFromHEX(tuple->value->int32) : GColorFromHEX(0xffffff);
}
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'lcdbgcolor'
GColor enamel_get_lcdbgcolor(){
	Tuple* tuple = dict_find(&s_dict, 2034775931);
	return tuple ? GColorFromHEX(tuple->value->int32) : GColorFromHEX(0xaaffff);
}
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'lcdtextcolor'
GColor enamel_get_lcdtextcolor(){
	Tuple* tuple = dict_find(&s_dict, 1042879493);
	return tuple ? GColorFromHEX(tuple->value->int32) : GColorFromHEX(0x000000);
}
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'labelcolor'
GColor enamel_get_labelcolor(){
	Tuple* tuple = dict_find(&s_dict, 1497886225);
	return tuple ? GColorFromHEX(tuple->value->int32) : GColorFromHEX(0xffffff);
}
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'alarmcolor'
GColor enamel_get_alarmcolor(){
	Tuple* tuple = dict_find(&s_dict, 1438609354);
	return tuple ? GColorFromHEX(tuple->value->int32) : GColorFromHEX(0xaaaa55);
}
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'shockcolor'
GColor enamel_get_shockcolor(){
	Tuple* tuple = dict_find(&s_dict, 3780081189);
	return tuple ? GColorFromHEX(tuple->value->int32) : GColorFromHEX(0xaaaa55);
}
// -----------------------------------------------------

// -----------------------------------------------------
// Getter for 'shockarrowcolor'
GColor enamel_get_shockarrowcolor(){
	Tuple* tuple = dict_find(&s_dict, 634479437);
	return tuple ? GColorFromHEX(tuple->value->int32) : GColorFromHEX(0xaa0000);
}
// -----------------------------------------------------


static uint16_t prv_get_inbound_size() {
	return 1
		+ 7 + 4
		+ 7 + 4
		+ 7 + 4
		+ 7 + 4
		+ 7 + 4
		+ 7 + 4
		+ 7 + 4
		+ 7 + 4
		+ 7 + 4
;
}

static uint32_t prv_map_messagekey(const uint32_t key){
	if( key == MESSAGE_KEY_bgcolor) return 1727354161;
	if( key == MESSAGE_KEY_resistcolor) return 2289530204;
	if( key == MESSAGE_KEY_bordercolor) return 4048477760;
	if( key == MESSAGE_KEY_lcdbgcolor) return 2034775931;
	if( key == MESSAGE_KEY_lcdtextcolor) return 1042879493;
	if( key == MESSAGE_KEY_labelcolor) return 1497886225;
	if( key == MESSAGE_KEY_alarmcolor) return 1438609354;
	if( key == MESSAGE_KEY_shockcolor) return 3780081189;
	if( key == MESSAGE_KEY_shockarrowcolor) return 634479437;
	return 0;
}

static void prv_key_update_cb(const uint32_t key, const Tuple *new_tuple, const Tuple *old_tuple, void *context){
}

static bool prv_each_settings_received(void *this, void *context) {
	SettingsReceivedState *state=(SettingsReceivedState *)this;
	state->handler(state->context);
	return true;
}


static bool prv_is_setting_message(const DictionaryIterator *iter){
	if( dict_find(iter, MESSAGE_KEY_bgcolor) ) return true;
	if( dict_find(iter, MESSAGE_KEY_resistcolor) ) return true;
	if( dict_find(iter, MESSAGE_KEY_bordercolor) ) return true;
	if( dict_find(iter, MESSAGE_KEY_lcdbgcolor) ) return true;
	if( dict_find(iter, MESSAGE_KEY_lcdtextcolor) ) return true;
	if( dict_find(iter, MESSAGE_KEY_labelcolor) ) return true;
	if( dict_find(iter, MESSAGE_KEY_alarmcolor) ) return true;
	if( dict_find(iter, MESSAGE_KEY_shockcolor) ) return true;
	if( dict_find(iter, MESSAGE_KEY_shockarrowcolor) ) return true;
	return false;	
}

static void prv_inbox_received_handle(DictionaryIterator *iter, void *context) {
	if( prv_is_setting_message(iter) ){
		if(s_dict_buffer){
			free(s_dict_buffer);
			s_dict_buffer = NULL;
		}
		s_dict_size = dict_size(iter);
		s_dict_buffer = malloc(s_dict_size);

		Tuple *tuple=dict_read_first(iter);
		while(tuple){
			tuple->key = prv_map_messagekey(tuple->key);
			tuple=dict_read_next(iter);
		}

		dict_write_begin(&s_dict, s_dict_buffer, s_dict_size);
		dict_write_end(&s_dict);
		dict_merge(&s_dict, &s_dict_size, iter, false, prv_key_update_cb, NULL);

		if(s_handler_list){
			linked_list_foreach(s_handler_list, prv_each_settings_received, NULL);
		}

		s_config_changed = true;
	}
}

static uint16_t prv_save_generic_data(uint32_t startkey, const void *data, uint16_t size){
	uint16_t offset = 0;
	uint16_t total_w_bytes = 0;
	uint16_t w_bytes = 0;
	while(offset < size){
		w_bytes = size - offset < PERSIST_DATA_MAX_LENGTH ? size - offset : PERSIST_DATA_MAX_LENGTH;
		w_bytes = persist_write_data(startkey + offset / PERSIST_DATA_MAX_LENGTH, data + offset, w_bytes);
		total_w_bytes += w_bytes;
		offset += PERSIST_DATA_MAX_LENGTH;
	}
	return total_w_bytes; 
}

static uint16_t prv_load_generic_data(uint32_t startkey, void *data, uint16_t size){
	uint16_t offset = 0;
	uint16_t total_r_bytes = 0;
	uint16_t expected_r_bytes = 0;
	uint16_t r_bytes = 0;
	while(offset < size){
		if(size - offset > PERSIST_DATA_MAX_LENGTH){
			expected_r_bytes = PERSIST_DATA_MAX_LENGTH;
		}
		else {
			expected_r_bytes = size - offset;
		}
		r_bytes = persist_read_data(startkey + offset / PERSIST_DATA_MAX_LENGTH, data + offset, expected_r_bytes);
		total_r_bytes += r_bytes;
		if(r_bytes != expected_r_bytes){
			break; 
		}
		offset += PERSIST_DATA_MAX_LENGTH;
	}
	return total_r_bytes;
}

void enamel_init(){
	if(persist_exists(ENAMEL_PKEY) && persist_exists(ENAMEL_DICT_PKEY)) 
	{
		s_dict_size = persist_read_int(ENAMEL_PKEY);
		s_dict_buffer = malloc(s_dict_size);
		prv_load_generic_data(ENAMEL_DICT_PKEY, s_dict_buffer, s_dict_size);
	}
	else {
		s_dict_size = 0;
		s_dict_buffer = NULL;
	}

	dict_read_begin_from_buffer(&s_dict, s_dict_buffer, s_dict_size);
	
	s_config_changed = false;
	s_event_handle = events_app_message_register_inbox_received(prv_inbox_received_handle, NULL);
	events_app_message_request_inbox_size(prv_get_inbound_size());
}

void enamel_deinit(){
	if(s_config_changed){
		persist_write_int(ENAMEL_PKEY, s_dict_size);
		prv_save_generic_data(ENAMEL_DICT_PKEY, s_dict_buffer, s_dict_size);
	}

	if(s_dict_buffer){
		free(s_dict_buffer);
		s_dict_buffer = NULL;
	}

	s_config_changed = false;
	events_app_message_unsubscribe(s_event_handle);
}

EventHandle enamel_settings_received_subscribe(EnamelSettingsReceivedHandler *handler, void *context) {
	if (!s_handler_list) {
		s_handler_list = linked_list_create_root();
	}

	SettingsReceivedState *this = malloc(sizeof(SettingsReceivedState));
	this->handler = handler;
	this->context = context;
	linked_list_append(s_handler_list, this);

	return this;
}

void enamel_settings_received_unsubscribe(EventHandle handle) {
	int16_t index = linked_list_find(s_handler_list, handle);
	if (index == -1) {
		return;
	}

	free(linked_list_get(s_handler_list, index));
	linked_list_remove(s_handler_list, index);
	if (linked_list_count(s_handler_list) == 0) {
		free(s_handler_list);
		s_handler_list = NULL;
	}
}