import React, { Component } from "react";
import StateArc from "../utils/svg/arc";
import State from "../utils/svg/state";

class SettingsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined
    };
  }

  render() {
    let val = this.props.selectedItem;
    return (
      <div className="col-12 col-lg-2 bg-light">
        <h6>Settings</h6>

        {this.props.selectedItem ? (
          <div className="container">
            <svg width="100%" height="200" viewBox="0 0 200 200">
              <State
                cx={100}
                cy={100}
                text={val.name}
                isStart={val.isStart}
                isFinal={val.isFinal}
              />
            </svg>
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck1"
                checked={val && val.isStart ? true : false}
                onClick={() => {
                  this.props.selectedItem.isStart = this.props.selectedItem.isStart?false:true
                  
                }}
              />
              <label class="custom-control-label" for="customCheck1">
                Initial
              </label>
            </div>
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck2"
                checked={val && val.isFinal ? true : false}
                onClick={() => {
                  this.props.selectedItem.isFinal = this.props.selectedItem.isFinal?false:true
                  
                }}
              />
              <label class="custom-control-label" for="customCheck2">
                Final
              </label>
            </div>
          </div>
        ) : (
          " "
        )}
      </div>
    );
  }
}

export default SettingsBar;
