import React, { Component } from "react";
import StateArc from "../utils/svg/arc";
import State from "../utils/svg/state";

class SettingsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined
    };

    this.setSelected = this.setSelected.bind(this);
  }

  setSelected(item,initial) {
    let selectedItem = Object.assign({},this.props.selectedItem ) ;
    selectedItem.item = item;
    this.props.update(selectedItem,initial);


  }

  render() {
    
    let val = undefined;
    if(this.props.selectedItem.item )
     val = Object.assign({},this.props.selectedItem.item ) ;
    return (
      <div className="col-12 col-lg-2 bg-light">
        <h5>Settings</h5>

        {val ? (
         val.type =="STATE"? <StateSettings selectedItem={val} setSelected={this.setSelected} hasInitial={this.props.hasInitial} />
         : <ArcSettings selectedItem={val} setSelected={this.setSelected} content={this.props.content}/>
        ) : (
          <div style={{ height: 250 }}> </div>
        )}
      </div>
    );
  }
}

export default SettingsBar;

class StateSettings extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      x: props.selectedItem.x,
      y: props.selectedItem.y,
      name:props.selectedItem.name
    }
  }
  
  
  componentWillReceiveProps(nextProps) {
    this.setState({x:nextProps.selectedItem.x,y:nextProps.selectedItem.y,name:nextProps.selectedItem.name});
  }
  render() {



  let val = this.props.selectedItem;
  return (
  <div>
    <svg width="100%" height="200" viewBox="0 0 200 200">
      <State
        cx={100}
        cy={100}
        text={val.name}
        isStart={val.isStart}
        isFinal={val.isFinal}
      />
    </svg>

    <div className="container col-10 col-md-12">
      <h6>State Settings</h6>
      <div className="input-group   ">
        <div className="input-group-prepend">
          <span className="input-group-text">Name</span>
        </div>
        <input type="text" className="form-control"  value={this.state.name}  onChange={ (e) => {val.name = e.target.value;  this.props.setSelected(val)}}/>
      </div>
      <div className="input-group   ">
        <div className="input-group-prepend">
          <span className="input-group-text">X</span>
        </div>
        <input type="number" className="form-control" step="10" value={this.state.x}  onChange={ (e) => {val.x = parseFloat(e.target.value) || 0;  this.props.setSelected(val)}}/>
      </div>
      <div className="input-group ">
        <div className="input-group-prepend">
          <span className="input-group-text">Y</span>
        </div>
        <input type="number" step="10" className="form-control" value={this.state.y} onChange={ (e) =>{val.y = parseFloat(e.target.value) || 0; this.props.setSelected(val)}} />
      </div>  
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id="customCheck1"
          checked={val && val.isStart ? true : false}
          onClick={() => {
            val.isStart = val.isStart
              ? false
              : true;
            this.props.setSelected(val,val.isStart);
          }}
          disabled={ this.props.hasInitial && !val.isStart }
          onChange={() => {}}
        />
        <label className="custom-control-label" htmlFor="customCheck1">
          Initial
        </label>
      </div>
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id="customCheck2"
          checked={val && val.isFinal ? true : false}
          onClick={() => {
            val.isFinal = val.isFinal
              ? false
              : true;
            this.props.setSelected(val);
          }}
          onChange={() => {}}
        />
        <label className="custom-control-label" htmlFor="customCheck2">
          Final
        </label>
      </div>
    </div>
    <div style={{ height: 50 }}> </div>
  </div>
  );
}
}


class ArcSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: props.selectedItem.input.join(',')
    }
  }
  
  
  componentWillReceiveProps(nextProps) {
    this.setState({input:nextProps.selectedItem.input});
  }
  render() {


    let content = this.props.content;
    let val = this.props.selectedItem;
    console.log(content);
    console.log(val);
    return (
    <div>
      <svg width="100%" height="200" viewBox="0 0 200 200">
      <StateArc 
        start={ {x:0,y:100 } }
        end={ {x:200,y:100 }  } 
        input = {val.input}/>
      </svg>
  
      <div className="container col-10 col-md-12">
        <h6>Arc Settings</h6>
        <div className="input-group   ">
          <div className="input-group-prepend">
            <span className="input-group-text">Start</span>
          </div>
          <input type="text" className="form-control"  defaultValue={content[val.start].name} readOnly />
        </div>
        <div className="input-group   ">
          <div className="input-group-prepend">
            <span className="input-group-text">End</span>
          </div>
          <input type="text" className="form-control"  defaultValue={content[val.end].name}  readOnly/>
        </div>
        <div className="input-group   ">
          <div className="input-group-prepend">
            <span className="input-group-text">Input</span>
          </div>
          <input type="text" className="form-control"  value={this.state.input}  onChange= {(e) => {
            val.input = e.target.value.split(/[ ,]+/);
            this.props.setSelected(val);
          }}/>
        </div>
        
      </div>
      <div style={{ height: 50 }}> </div>
    </div>
    );
  }; 
}
