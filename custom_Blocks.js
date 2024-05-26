import Blockly from "blockly";
//import { javascriptGenerator, Order } from "blockly/javascript";
import { pythonGenerator, Order } from "blockly/python"


Blockly.Blocks["move"] = {
  init: function() {
    this.appendDummyInput("direction")
    	.appendField("direction")
    	.appendField(new Blockly.FieldDropdown([["up","up"],["down","down"]]),"direction_value");
    this.appendDummyInput("distance")
    	.appendField("distance")
    	.appendField(new Blockly.FieldNumber(0),"distance_value");
    this.appendDummyInput("distance")
    	.appendField("time")
    	.appendField(new Blockly.FieldNumber(0),"time_value");
    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setColour(250);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
Blockly.Blocks["rotate"] = {
  init: function() {
    this.appendDummyInput("angle")
    	.appendField("angle")
    	.appendField(new Blockly.FieldAngle(0),"angle_value")
    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setColour(250);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

pythonGenerator.forBlock["move"] = function (block, generator) {
  var value_time = block.getFieldValue('time_value');
  var value_direction = block.getFieldValue('direction_value');
  var value_distance = block.getFieldValue('distance_value');
  var code = 'robot.move( Direction: ' + value_direction + ', Distance: ' + value_distance + ', Time: ' + value_time + ');\n';
  return code;
};
pythonGenerator.forBlock["rotate"] = function (block, generator) {
  var value_angle = block.getFieldValue('angle_value');
  var code = 'robot.rotate( Angel: ' + value_angle + ');\n';
  return code;
};
