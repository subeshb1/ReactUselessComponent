import React, { Component } from "react";
import PropTypes from "prop-types";
import Draw from "../utils/svg/draw";
import MenuBar from "./menu";
import ToolBar from "./tool-bar";
import SettingsBar from "./settings-bar";
let tuples = {
  state: ["A", "B", "C", "D", "E", "F", "G", "H"],
  alphabet: ["0", "1"],
  initial: ["A"],
  final: ["C"],
  transition: {
    A: {
      0: ["B"],
      1: ["F"]
    },
    B: {
      0: ["G"],
      1: ["C"]
    },
    C: {
      0: ["A"],
      1: ["C"]
    },
    D: {
      0: ["C"],
      1: ["G"]
    },
    E: {
      0: ["H"],
      1: ["F"]
    },
    F: {
      0: ["C"],
      1: ["G"]
    },
    G: {
      0: ["G"],
      1: ["E"]
    },
    H: {
      0: ["G"],
      1: ["C"]
    }
  }
};
class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = this.getContentData(tuples);
  }

  //Updating selectedItem MODE 0 action
  update(selectedItem,hasInitial) {
    if(hasInitial === undefined || typeof hasInitial !== "boolean")
      hasInitial = this.state.hasInitial;
    if (selectedItem) {
      let mappedContent = this.state.content.map(obj => Object.assign({}, obj));

      if (selectedItem.item && selectedItem.index !== undefined) {
        if (
          this.state.selectedItem.item &&
          this.state.selectedItem.index !== selectedItem
        ) {
          mappedContent[this.state.selectedItem.index].isSelected = false;
        }
        mappedContent[selectedItem.index] = selectedItem.item;
      } else if (selectedItem.index !== undefined) {
        mappedContent[selectedItem.index].isSelected = false;
        selectedItem.index = undefined;
        selectedItem.isDragged = false;
      } else throw new TypeError("Invalid selected Item");

      this.setState({ content: mappedContent, selectedItem,hasInitial });
    } else {
      throw new TypeError("Excepts a defined param");
    }
  }

  //changing Mode
  setMode(mode) {
    
    switch(this.state.mode) {
      case 0:
        if(mode === 0)
          return;
        this.setState({mode} ,() => {
          //to remove selection if selected
          let selectedItem = Object.assign({},this.state.selectedItem);
          if(selectedItem.item) {
          selectedItem.item = undefined
          this.update(selectedItem);
          }
        });
        break;
      case 1:
        this.setState({mode} );
        break;
      case 2:
        this.setState({mode});
        break;

    }
    
  }


  addState(x,y) {
    let state = {
      type: "STATE",
      name: 'q',
      isSelected: false,
      x,y,
      isStart: false,
      isFinal: false,
      index: 0
    }
    this.state.content.unshift(state);
    let content = this.state.content.map( (obj,index) => {
      if(index === 0)
        return obj
      if(obj.type == "STATE") {
        obj.index++;
      } else {
        obj.index++;
        obj.start++;
        obj.end++;
      }
    });
    this.setState( {content:this.state.content,mode:0});
  }
  componentDidUpdate() {
    // console.log(this.state);
  }
  render() {
    let mappedContent = this.state.content.map(obj => Object.assign({}, obj));
    return (
      <div style={{ background: "#e7e7e7" }} className="container-fluid">
        {/* MenuBar */}

        <MenuBar />

        <div className="row  mx-auto " style={{ marginTop: -10 }}>
          {/* Tools Menu */}
          <ToolBar 
            setMode={this.setMode.bind(this)}
            mode={this.state.mode}
          />
          {/* Drawer */}
          <Draw
            content={mappedContent}
            selectedItem={Object.assign({}, this.state.selectedItem)}
            update={this.update.bind(this)}
            mode={this.state.mode}
            addState={this.addState.bind(this)}
          />
          {/*Settings*/}
          <SettingsBar
            content={mappedContent}
            selectedItem={Object.assign({}, this.state.selectedItem)}
            update={this.update.bind(this)}
            hasInitial={this.state.hasInitial}
          />
        </div>
      </div>
    );
  }

  getContentData(val) {
    let tuples = val;
    let y = 300;
    let x = -100;
    let index = 0;
    let stateContent = [];
    let hasInitial = true;
    tuples.state.forEach(state => {
      stateContent.push({
        type: "STATE",
        name: state,
        isSelected: false,
        x: (x += 200),
        y: y,
        isStart: tuples.initial == state,
        isFinal: !(tuples.final.findIndex(val => val === state) == -1),
        index: index++
      });
    });

    let linkContent = [];
    for (let state in tuples.transition) {
      for (let input in tuples.transition[state]) {
        let start = stateContent.find(s => s.name == state);
        let end = stateContent.find(
          s => s.name == tuples.transition[state][input][0]
        );
        let link = linkContent.find(
          link => link.start == start && link.end == end
        );
        if (!link) {
          linkContent.push({
            type: "ARC",
            start: start.index,
            end: end.index,
            input: [input],
            isSelected: false,
            index: index++
          });
        } else {
          link.input.push(input);
        }
      }
    }

    // return [ ...stateContent, ...linkContent];

    let state = {
      content: [...stateContent, ...linkContent],

      hasInitial,
      selectedItem: {
        item: undefined,
        index: undefined,
        isDragged: false
      },
      mode:0
    };

    return state;
  }
}

Drawer.propTypes = {};

export default Drawer;
