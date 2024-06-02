import "./customBlocks/custom_Blocks";
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python"
import { BlocklyWorkspace } from "react-blockly";
import { PureComponent } from "react";
import React, { useState } from "react";
import "./App.css";

const initialXml = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
const toolbox = {
  kind: "categoryToolbox",
  contents: [
    /*{
      kind: "category",
      name: "Logic",
      colour: "#5b80a5",
      contents: [
        {
          kind: "block",
          type: "controls_if"
        },
        {
          kind: "block",
          type: "logic_compare",
          fields: {
            OP: "EQ"
          }
        },
        {
          kind: "block",
          type: "logic_operation",
          fields: {
            OP: "AND"
          }
        },
        {
          kind: "block",
          type: "logic_negate"
        },
        {
          kind: "block",
          type: "logic_boolean",
          fields: {
            BOOL: "TRUE"
          }
        },
        {
          kind: "block",
          type: "logic_null"
        },
        {
          kind: "block",
          type: "logic_ternary"
        }
      ]
    },
    {
      kind: "category",
      name: "Loops",
      colour: "#5ba55b",
      contents: [
        {
          kind: "block",
          type: "controls_repeat_ext",
          values: {
            TIMES: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "10"
              }
            }
          }
        },
        {
          kind: "block",
          type: "controls_whileUntil",
          fields: {
            MODE: "WHILE"
          }
        },
        {
          kind: "block",
          type: "controls_for",
          fields: {
            VAR: {
              id: "XECl4GVs-^+[?1V:UI%Z",
              name: "i"
            }
          },
          values: {
            FROM: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "1"
              }
            },
            TO: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "10"
              }
            },
            BY: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "1"
              }
            }
          }
        },
        {
          kind: "block",
          type: "controls_forEach",
          fields: {
            VAR: {
              id: "zbX-3A%GYRcl`Ngw=KCn",
              name: "j"
            }
          }
        },
        {
          kind: "block",
          type: "controls_flow_statements",
          fields: {
            FLOW: "BREAK"
          }
        }
      ]
    },
    {
      kind: "category",
      name: "Math",
      colour: "#5b67a5",
      contents: [
        {
          kind: "block",
          type: "math_number",
          fields: {
            NUM: "0"
          }
        },
        {
          kind: "block",
          type: "math_arithmetic",
          fields: {
            OP: "ADD"
          },
          values: {
            A: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "1"
              }
            },
            B: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "1"
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_single",
          fields: {
            OP: "ROOT"
          },
          values: {
            NUM: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "9"
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_trig",
          fields: {
            OP: "SIN"
          },
          values: {
            NUM: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "45"
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_constant",
          fields: {
            CONSTANT: "PI"
          }
        },
        {
          kind: "block",
          type: "math_number_property",
          fields: {
            PROPERTY: "EVEN"
          },
          values: {
            NUMBER_TO_CHECK: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "0"
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_round",
          fields: {
            OP: "ROUND"
          },
          values: {
            NUM: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "3.1"
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_on_list",
          mutation: {
            op: "SUM"
          },
          fields: {
            OP: "SUM"
          }
        },
        {
          kind: "block",
          type: "math_modulo",
          values: {
            DIVIDEND: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "64"
              }
            },
            DIVISOR: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "10"
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_constrain",
          values: {
            VALUE: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "50"
              }
            },
            LOW: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "1"
              }
            },
            HIGH: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "100"
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_random_int",
          values: {
            FROM: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "1"
              }
            },
            TO: {
              kind: "block",
              type: "math_number",
              fields: {
                NUM: "100"
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_random_float"
        }
      ]
    },
    {
      kind: "category",
      name: "Text",
      colour: "#5ba58c",
      contents: [
        {
          kind: "block",
          type: "text",
          fields: {
            TEXT: ""
          }
        },
        {
          kind: "block",
          type: "text_join",
          mutation: {
            items: "2"
          }
        },
        {
          kind: "block",
          type: "text_append",
          fields: {
            VAR: {
              id: "7j+{(eU@3Nf`G7G@/J%}",
              name: "item"
            }
          },
          values: {
            TEXT: {
              kind: "block",
              type: "text",
              fields: {
                TEXT: ""
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_length",
          values: {
            VALUE: {
              kind: "block",
              type: "text",
              fields: {
                TEXT: "abc"
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_isEmpty",
          values: {
            VALUE: {
              kind: "block",
              type: "text",
              fields: {
                TEXT: ""
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_indexOf",
          fields: {
            END: "FIRST"
          },
          values: {
            VALUE: {
              kind: "block",
              type: "variables_get",
              fields: {
                VAR: {
                  id: ",Yd_J]Tvz2@pj)r9I|p$",
                  name: "text"
                }
              }
            },
            FIND: {
              kind: "block",
              type: "text",
              fields: {
                TEXT: "abc"
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_charAt",
          mutation: {
            at: "true"
          },
          fields: {
            WHERE: "FROM_START"
          },
          values: {
            VALUE: {
              kind: "block",
              type: "variables_get",
              fields: {
                VAR: {
                  id: ",Yd_J]Tvz2@pj)r9I|p$",
                  name: "text"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_getSubstring",
          mutation: {
            at1: "true",
            at2: "true"
          },
          fields: {
            WHERE1: "FROM_START",
            WHERE2: "FROM_START"
          },
          values: {
            STRING: {
              kind: "block",
              type: "variables_get",
              fields: {
                VAR: {
                  id: ",Yd_J]Tvz2@pj)r9I|p$",
                  name: "text"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_changeCase",
          fields: {
            CASE: "UPPERCASE"
          },
          values: {
            TEXT: {
              kind: "block",
              type: "text",
              fields: {
                TEXT: "abc"
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_trim",
          fields: {
            MODE: "BOTH"
          },
          values: {
            TEXT: {
              kind: "block",
              type: "text",
              fields: {
                TEXT: "abc"
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_print",
          values: {
            TEXT: {
              kind: "block",
              type: "text",
              fields: {
                TEXT: "abc"
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_prompt_ext",
          mutation: {
            type: "TEXT"
          },
          fields: {
            TYPE: "TEXT"
          },
          values: {
            TEXT: {
              kind: "block",
              type: "text",
              fields: {
                TEXT: "abc"
              }
            }
          }
        }
      ]
    },
    {
      kind: "sep"
    },
    {
      kind: "category",
      name: "Variables",
      colour: "#a55b80",
      custom: "VARIABLE"
    },
    {
      kind: "category",
      name: "Functions",
      colour: "#995ba5",
      custom: "PROCEDURE"
    },
    {
      kind: "sep"
    },*/ 
    { 
      kind: "category",
      name: "Move",
      colour: "#3A81A3",
      contents: [
        {
          kind: "block",
          type: "move"
        },
        
      ]
    },
    {
      kind: "sep"
    }, 
    { 
      kind: "category",
      name: "Rotate",
      colour: "#39A1A3",
      contents: [
        {
          kind: "block",
          type: "rotate"
        },
        
      ]
    },
  ]
};

function sendDataToBackend(data) {

    //chuyển đổi dữ liệu thành JSON
    const jsonData = JSON.stringify(data);
    
    // Tạo một yêu cầu Fetch
    fetch('sqlalchemy.url' , { //thay url backend vào
      method: 'POST' ,
      headers: {
       'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then(response => {
     if(!response.ok) {
      throw new Error('Network response was not ok');
     }
     return response.json(); // Phân tích phản hồi JSON nếu cần
    })
    .then(data => {
     console.log('Data sent successfully:', data);
     //Xử lý phản hồi từ backend (nếu cần)
     })
     .catch(error => {
       console.error('There was a problem with your fetch operation:', error);
     });  
}

class BlocklyComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      xml: "",
      pythonCode: ""
    };
  }

  handleGenerateJSCode = () => {
    //const jsCode = javascriptGenerator.workspaceToCode();
    const pythonCode = pythonGenerator.workspaceToCode();
    
    this.setState({ pythonCode });
    
    sendDataToBackend(pythonCode);
    
    
    console.log(pythonCode);
    console.log(this.state.xml);
    
    
  };

  handleXmlChange = (xml) => {
    this.setState({ xml });
  };

  handleWorkspaceChange = (workspace) => {
    //const jsCode = Blockly.JavaScript.workspaceToCode(workspace);
    const pythonCode = Blockly.Python.workspaceToCode(workspace);
    this.state({ pythonCode });
  };

  render() {
    return (
      <div className="container">
        <h1>React Blockly</h1>
        
        <BlocklyWorkspace
          className="blockly_container"
          initialXml={initialXml}
          toolboxConfiguration={toolbox}
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 5,
              colour: "#ccc",
              snap: true
            }
          }}
          onXmlChange={this.handleXmlChange}
        />
        <button onClick={this.handleGenerateJSCode} >Generate Python Code</button>
        <div>{this.state.pythonCode}</div>
        
      </div>
    );
  }
}

export default BlocklyComponent;

