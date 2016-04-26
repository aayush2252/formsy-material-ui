import React from 'react';
import keycode from 'keycode';
import Formsy from 'formsy-react';
import TextField from 'material-ui/TextField';
import {_setMuiComponentAndMaybeFocus} from './utils';

let FormsyText = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },

  componentWillMount: function() {
    this.setValue(this.props.defaultValue || this.props.value || '');
  },

  getInitialState: function() {
    return {
      value: this.props.defaultValue || this.props.value || '',
    }
  },

  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleChange: function handleChange(event) {
    this.setState({
      value: event.currentTarget.value
    });
    if (this.props.onChanger) this.props.onChange(event);
  },

  handleKeyDown: function handleKeyDown(event) {
    if (keycode(event) === 'enter') this.setValue(event.currentTarget.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    const {defaultValue, onFocus, value, ...rest} = this.props;
    return (
      <TextField
        {...rest}
        errorText={this.getErrorMessage()}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={onFocus}
        onKeyDown={this.handleKeyDown}
        ref={this._setMuiComponentAndMaybeFocus}
        value={this.state.value}
      />
    );
  }
});

export default  FormsyText;
