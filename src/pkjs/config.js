// config.js
module.exports = [
  {
    "type": "section",
    "items": 
    [
      {
        "type": "heading",
        "defaultValue": "LIVE PREVIEW"
      },
      {
        "type": "text",
        "id": "canvas",
        "defaultValue": "<canvas id=\"canvas\" width=\"144\" height=\"168\" ></canvas>"
      },
      {
        "type": "color",
        "id": "bgcolor",
        "messageKey": "bgcolor",
        "label": "Background Color",
        "defaultValue": "000000",
        "sunlight": false,
        "allowGray": false
      },
      {
        "type": "color",
        "id": "resistcolor",
        "messageKey": "resistcolor",
        "label": "Water/Splash Resist Color",
        "defaultValue": "00aaff",
        "sunlight": false,
        "allowGray": false
      },
      {
        "type": "color",
        "id": "bordercolor",
        "messageKey": "bordercolor",
        "label": "Border Color",
        "defaultValue": "ffffff",
        "sunlight": false,
        "allowGray": false
      },
      {
        "type": "color",
        "id": "lcdbgcolor",
        "messageKey": "lcdbgcolor",
        "label": "LCD Background Color",
        "defaultValue": "aaffff",
        "sunlight": false,
        "allowGray": false
      },
      {
        "type": "color",
        "id": "lcdtextcolor",
        "messageKey": "lcdtextcolor",
        "label": "LCD Text Color",
        "defaultValue": "000000",
        "sunlight": false,
        "allowGray": false
      },
      {
        "type": "color",
        "id": "labelcolor",
        "messageKey": "labelcolor",
        "label": "Label Color",
        "defaultValue": "ffffff",
        "sunlight": false,
        "allowGray": false
      },
      {
        "type": "color",
        "id": "alarmcolor",
        "messageKey": "alarmcolor",
        "label": "Alarm Chrono Color",
        "defaultValue": "aaaa55",
        "sunlight": false,
        "allowGray": false
      },
      {
        "type": "color",
        "id": "shockcolor",
        "messageKey": "shockcolor",
        "label": "Shock Resist Color",
        "defaultValue": "aaaa55",
        "sunlight": false,
        "allowGray": false
      },
      {
        "type": "color",
        "id": "shockarrowcolor",
        "messageKey": "shockarrowcolor",
        "label": "Shock Arrow Color",
        "defaultValue": "aa0000",
        "sunlight": false,
        "allowGray": false
      }
    ]
  },
  { "type": "submit", "defaultValue": "Save" }
]