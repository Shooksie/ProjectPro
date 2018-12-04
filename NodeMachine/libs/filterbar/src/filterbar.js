import React from 'react';
import _ from 'lodash';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.filterObj = [];
    this.setUpOptions(props);

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.setUpOptions(this.props);
  }

  componentDidUpdate() {
    this.setUpOptions(this.props);
  }

  setUpOptions({keys, data, displaydata, selected}) {
    const tempObj = {
      keys: keys,
      keyOptions: {},
      keyDropDowns: {},
      selectedKeyChoices: selected || {},
      displaydata: displaydata
    };


    data.forEach((t) => {
      keys.forEach((keyVal) => {
        if (!tempObj.selectedKeyChoices.hasOwnProperty(keyVal)) {
          tempObj.selectedKeyChoices[keyVal] = [];
        }
        if (!tempObj.keyOptions.hasOwnProperty(keyVal)) {
          tempObj.keyOptions[keyVal] = [];
        }
        if (!tempObj.keyDropDowns.hasOwnProperty(keyVal)) {
          tempObj.keyDropDowns[keyVal] = [];
        }
        if (!tempObj.keyOptions[keyVal].includes(t[keyVal])) {
          tempObj.keyOptions[keyVal].push(t[keyVal]);
        }
      })
    });
    this.filterObj = tempObj;
    this.renderDropDownItems();
  }

  filterDisplay() {
    return _.filter(this.props.data, (value) => {
      let returnVal = [];
      this.filterObj.keys.forEach((key) => {
        // debugger;
        // if (value.status === 3) {
        //   debugger;
        // }
        const vals = value[key];
        if (this.filterObj.selectedKeyChoices[key].length) {
          if (this.filterObj.selectedKeyChoices[key].includes(vals)) {
            returnVal.push(1);
          } else {
            returnVal.push(0);
          }
        }
      });
      if (!(returnVal.includes(0))) {
        return true
      }
      return false;
    })
  }

  onClick(event, keyVal, value) {
    console.log(this.filterObj.selectedKeyChoices);
    if (event.target.checked) {
      this.filterObj.selectedKeyChoices[keyVal].push(value);
    } else {
      _.remove(this.filterObj.selectedKeyChoices[keyVal], (val) => value === val);
    }
    console.log(this.filterObj.selectedKeyChoices);
    this.props.callback(this.filterDisplay(), this.filterObj.selectedKeyChoices);
  }

  renderFilters() {
    const {filterObj} = this;
    const array = [];
    filterObj.keys.forEach((keyVal) => {
      array.push(
        <div key={keyVal} className={'col-1'}>
          <div className="dropdown">
            <button className="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {keyVal}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {this.filterObj.keyDropDowns[keyVal]}
            </div>
          </div>
        </div>)
    });
    return array;
  }

  renderDropDownItems() {
    const {filterObj} = this;
    filterObj.keys.forEach((keyVal) => {
      const array = [];
      filterObj.keyOptions[keyVal].sort().forEach((downOption => {
        if (this.filterObj.displaydata[keyVal]) {
          const display = this.filterObj.displaydata[keyVal][downOption];
          array.push(
            <div key={downOption} className="form-check">
              <input className="form-check-input"
                     type="checkbox"
                     value={downOption}
                     id="defaultCheck1"
                     onChange={(ev) => {
                       this.onClick(ev, keyVal, downOption)
                     }}/>
              <label className="form-check-label" htmlFor="defaultCheck1">
                {display}
              </label>
            </div>)
        }

      }));
      this.filterObj.keyDropDowns[keyVal] = array;
    });
  }

  render() {
    return (
      <div className='bg-light border-bottom border-dark row p-1'>
        {this.renderFilters()}
      </div>)
  }
}

export {FilterBar}