import Blockly from "blockly";
//import { javascriptGenerator, Order } from "blockly/javascript";
import { pythonGenerator, Order } from "blockly/python"

Blockly.Blocks["move_forward"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move Forward");
    this.setPreviousStatement(true,null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
Blockly.Blocks["move_backward"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move Backward");
    this.setPreviousStatement(true,null);
    this.setColour(250);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.Blocks["migration"] = {
  init: function() {
    this.appendDummyInput("angle")
    	.appendField("angle")
    	.appendField(new Blockly.FieldAngle(90),"angle_value")
    this.appendDummyInput("direction")
    	.appendField("direction")
    	.appendField(new Blockly.FieldDropdown([["move_forward","forward"],["move_backward","backward"]]),"direction_value");
    this.appendDummyInput("distance")
    	.appendField("distance")
    	.appendField(new Blockly.FieldNumber(0),"distance_value");
    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setColour(250);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


pythonGenerator.forBlock["move_forward"] = function (block, generator) {
  // Tạo mã Python tương ứng với hành động di chuyển robot về phía trước
  var code = 'move_forward';
  return code;
};
pythonGenerator.forBlock["move_backward"] = function (block, generator) {
  // Tạo mã Python tương ứng với hành động di chuyển robot về phía sau
  var code = 'move_backward';
  return code;
};
pythonGenerator.forBlock["migration"] = function (block, generator) {
  var value_angle = block.getFieldValue('angle_value');
  var value_direction = block.getFieldValue('direction_value');
  var value_distance = block.getFieldValue('distance_value');
  var code = 'robot.migration( Direction: ' + value_direction + ', Angel: ' + value_angle + ', Distance: ' + value_distance + ');\n';
  return code;
};
