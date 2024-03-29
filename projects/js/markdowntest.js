import React from 'react';
import {
  MarkedInput,
  MarkedPreview,
  Markedtoolbar } from 'react-markdown-area';

// Here is a live preview editor


export default class LiveMarkedArea extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue ? props.defaultValue : ''
    };
  }
  static defaultProps = {
    id: 'mmc-marked-area',
    label: '',
    classNames: {
      root: 'marked-area',
      header: 'marked-area-header',
      activeButton: 'marked-area-button active',
      defaultButton: 'marked-area-button',
      helpLink: 'marked-area-help-link',
      textContainer: 'marked-area-text-container',
      liveDivider: 'marked-area-live-divider'
    }
  };
  handleTextChange = (e) => {
    this.setState({value: e.target.value});
  };
  render() {
    let {id, label, classNames, placeholder} = this.props;
    let {value} = this.state;
    return (
    <section className={classNames.root}>

      <header className={classNames.header}>
        <label htmlFor={id}>{label}</label>
      </header>

        <MarkedInput
          placeholder={placeholder}
          classNames={classNames}
          onChange={this.handleTextChange}
          value={value} />

        <MarkedPreview classNames={classNames}
          value={value} />

    </section>
    );
  }
}