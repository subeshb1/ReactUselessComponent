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
            selectedItem: undefined
        }
    }
    
    setSelected(item) {
        this.setState({selectedItem:item});
    }

  render() {
    return (
      <div style={{ background: "#e7e7e7" }} className="container-fluid">
        {/* MenuBar */}

        <MenuBar />

        <div className="row  mx-auto " style={{ marginTop: -10 }}>
          {/* Tools Menu */}
          {/* <div className="col-12 col-lg-1"> ds</div> */}
          <ToolBar />
          {/* Drawer */}
          <Draw tuples={tuples} setSelected={this.setSelected.bind(this)} />
          {/*Settings*/}
          <SettingsBar selectedItem={this.state.selectedItem}/>
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {};

export default Drawer;
