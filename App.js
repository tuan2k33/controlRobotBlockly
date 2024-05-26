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
