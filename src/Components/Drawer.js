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
    this.state = {
      content: [...this.getContentData(tuples)],

      // selectedItem: undefined,
      // dragItem: undefined,
      selectedItem: {
        item: undefined,
        index:undefined,
        isDragged:false

      }
    };
    console.log(this.getContentData(tuples));
  }

  setSelected(item) {
    this.setState({ selectedItem: item });
  }

  update({selectedItem,dragItem}) { 
    if(selectedItem !== null && dragItem !== null) {
      this.setState({ selectedItem,dragItem });
    } else if(selectedItem !== null ) {
      this.setState({ selectedItem });
    } else if(dragItem !== null ) {
      this.setState({ dragItem });
    } else
      throw new TypeError ("None of the params match");
  }

  update1(selectedItem) {
      if(selectedItem) {
        let mappedContent = this.state.content.map (obj => Object.assign({},obj));

        if(selectedItem.item && selectedItem.index !== undefined) {

          if(this.state.selectedItem.item) {
            mappedContent[this.state.selectedItem.index].isSelected = false;
          }
          mappedContent[selectedItem.index] = selectedItem.item;
          
        } else if(selectedItem.index !== undefined){
          mappedContent[selectedItem.index].isSelected = false;
          mappedContent[selectedItem.index]['sdsd'] = false;
          selectedItem.index = undefined;
          selectedItem.isDragged = false;
          
        } else 
          throw new TypeError("Invalid selected Item");

          
        this.setState({content:mappedContent,selectedItem});
      } else {
        throw new TypeError("Excepts a defined param");
      }
  }

  componentWillUpdate(np,ns) {
    console.log(this.state.content,ns.content);
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  render() {
    return (
      <div style={{ background: "#e7e7e7" }} className="container-fluid">
        {/* MenuBar */}

        <MenuBar />

        <div className="row  mx-auto " style={{ marginTop: -10 }}>
          {/* Tools Menu */}
          <ToolBar />
          {/* Drawer */}
          <Draw
            content={this.state.content}
            selectedItem={this.state.selectedItem}
            setSelected={this.setSelected.bind(this)}
            update={this.update.bind(this)}
            update1={this.update1.bind(this)}
          />
          {/*Settings*/}
          {/* <SettingsBar
            selectedItem={this.state.selectedItem}
            setSelected={this.setSelected.bind(this)}
          /> */}
        </div>
      </div>
    );
  }

  getContentData(val) {
    let tuples = val;
    let y = 300;
    let x = -100;

    let stateContent = [];
    tuples.state.forEach(state => {
      stateContent.push({
        type: "STATE",
        name: state,
        isSelected: false,
        x: (x += 200),
        y: y,
        isStart: tuples.initial == state,
        isFinal: !(tuples.final.findIndex(val => val === state) == -1)
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
            start,
            end,
            input: [input],
            isSelected: false
          });
        } else {
          link.input.push(input);
        }
      }
    }

    return [...linkContent, ...stateContent];
  }
}

Drawer.propTypes = {};

export default Drawer;
