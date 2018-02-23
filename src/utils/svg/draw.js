import React, { Component } from "react";
import State from "./state";
import StateArc from "./arc";
import Point from "./points";

class Draw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: 1, //k
      touchAction: "auto" //k
    };

    //handles drag setting
    this.setDragItem = this.setDragItem.bind(this);
    this.removeDrag = this.removeDrag.bind(this);
    this.moveChild = this.moveChild.bind(this);
    this.removeSelection = this.removeSelection.bind(this);
  }

  //to move a Child (mouseMove)
  moveChild(e) {
    // e.preventDefault();
    if (this.props.mode === 0) {
      let selectedItem = Object.assign({}, this.props.selectedItem);

      if (selectedItem.isDragged) {
        let rect = e.currentTarget.getBoundingClientRect();
        let clientX = e.clientX || e.touches[0].clientX;
        let clientY = e.clientY || e.touches[0].clientY;
        let offsetX = clientX - rect.left;
        let offsetY = clientY - rect.top;
        selectedItem.item.x = offsetX / this.state.scale;
        selectedItem.item.y = offsetY / this.state.scale;
        this.props.update(selectedItem);
      }
    }
    e.stopPropagation();
  }

  //Remove dragItem when mouse Released (mouseUp)
  removeDrag(e) {
    if (this.props.mode === 0) {
      let selectedItem = Object.assign({}, this.props.selectedItem);
      if (selectedItem.isDragged) {
        selectedItem.isDragged = false;
        this.props.update(selectedItem);
      }
    }
  }

  //set a item to be draged
  setDragItem(index) {
    if (this.props.mode === 0) {
      let item = Object.assign({}, this.props.content[index]);
      let selectedItem = Object.assign({}, this.props.selectedItem);
      selectedItem.index = index;
      selectedItem.item = item;
      item.isSelected = true;
      selectedItem.isDragged = true;
      this.setState({ touchAction: "none" });
      this.props.update(selectedItem);
    }
  }

  //Remove Selection (onClick)
  removeSelection(e) {
    if (this.props.mode === 0) {
      let selectedItem = Object.assign({}, this.props.selectedItem);

      if (selectedItem.item) {
        selectedItem.item = undefined;
        this.props.update(selectedItem);
        this.setState({ touchAction: "auto" });
      }
    } else {
        let rect = e.currentTarget.getBoundingClientRect();
        let clientX = e.clientX || e.touches[0].clientX;
        let clientY = e.clientY || e.touches[0].clientY;
        let offsetX = clientX - rect.left;
        let offsetY = clientY - rect.top;
        let x = offsetX / this.state.scale;
        let y = offsetY / this.state.scale;
        this.props.addState(x,y);

    }
  }

  componentDidUpdate() {
    // console.log(this.state);
  }

  render() {
    let content = this.getContent();
    return (
      <div className="container-fluid col-12 col-lg-9 p-0 px-lg-2">
        <div
          style={{
            overflow: "scroll",
            height: window.innerHeight - window.innerHeight * 0.1
          }}
          className="container-fluid col-12"
        >
          <svg
            className="position-absolute"
            width="300%"
            height="300%"
            style={{
              background: "white",
              touchAction: this.state.touchAction,
              top: 0,
              left: 0
            }}
            onMouseMove={this.moveChild}
            onMouseUp={this.removeDrag}
            onTouchEnd={this.removeDrag}
            onMouseDown={this.removeSelection}
            onTouchMove={this.moveChild}
          >
            <g transform={`scale(${this.state.scale})`}>{content}</g>
          </svg>
        </div>

        <div className=" position-absolute p-1" style={{ top: 0 }}>
          <div
            className="btn-group"
            hidden={this.props.selectedItem.item ? true : false}
          >
            <button
              className="btn btn-dark"
              onClick={() => {
                this.setState({ scale: this.state.scale + 0.05 });
              }}
            >
              <i className="fa fa-plus" />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ scale: this.state.scale - 0.05 });
              }}
            >
              <i className="fa fa-minus" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  getContent() {
    let content = this.props.content;
    let mappedContent = content.map(ob => Object.assign({}, ob));
    return mappedContent.reverse().map((val, index) => {
      if (val.type == "STATE") {
        return (
          <State
            key={index}
            cx={val.x}
            cy={val.y}
            index={val.index}
            text={val.name}
            isSelected={val.isSelected}
            onMouseDown={this.setDragItem}
            isStart={val.isStart}
            isFinal={val.isFinal}
          />
        );
      } else {
        return (
          <StateArc
            key={index}
            index={val.index}
            isSelected={val.isSelected}
            start={{ x: content[val.start].x, y: content[val.start].y }}
            end={{ x: content[val.end].x, y: content[val.end].y }}
            invert={val.invert}
            onMouseDown={this.setDragItem}
            input={val.input}
          />
        );
      }
    });
  }
}

export default Draw;
