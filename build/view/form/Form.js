var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var RTList = require('../basic/RTList');
var FormItem = require('./FormItem');
var ButtonGroup = require('../basic/ButtonGroup');

module.exports = React.createClass({
	displayName: 'Form',
	getDefaultProps: function getDefaultProps() {
		return {
			sync: false,
			className: '',
			display: 'none',
			value: {},
			hiddens: {},
			submitCallback: function submitCallback(data) {
				if (data.status == 200) {
					return true;
				} else {
					return false;
				}
			}
		};
	},
	getInitialState: function getInitialState() {
		this._items = {};
		return {
			hiddens: this.props.hiddens,
			value: {}
		};
	},
	componentDidMount: function componentDidMount() {
		this.setValue(this.props.value);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.value != this.props.value) {
			this.setValue(nextProps.value);
		}
	},
	__onItemDidMount: function __onItemDidMount(formitem) {
		this._items[formitem.props.name || formitem.props.index] = formitem;
	},
	__itemRender: function __itemRender(item, index, rtlist) {
		return React.createElement(FormItem, _extends({
			disabled: this.props.disabled,
			readonly: this.props.readonly,
			float: this.props.float,
			value: this.state.value[item.name] || ''
		}, item, {
			form: this,
			onDidMount: this.__onItemDidMount }));
	},
	__onBtnsClick: function __onBtnsClick(props, btn, event) {
		if (!props) {
			return false;
		}
		switch (props.type) {
			case 'submit':
				if (btn.state.status == 'disabled' || btn.state.loading) {
					return;
				}
				this._submit = btn;
				this.submit();
				break;
			case 'reset':
				this.reset();
				break;
			case 'cancle':
				Popup.close('dialog');
				break;
		}
	},
	__onSubmitCallbackHandler: function __onSubmitCallbackHandler(data, xhr) {
		this.loading(false);
		if (this.props.submitCallback(data) !== false) {
			this.props.onSubmitSuccess && this.props.onSubmitSuccess(data, xhr, this);
		} else {
			this.props.onSubmitError && this.props.onSubmitError(data, xhr, this);
		}
	},
	item: function item(name) {
		return this._items[name];
	},
	setValue: function setValue(value) {
		var _this = this;

		if (!value) {
			return this;
		}
		if (zn.isZNObject(value)) {
			return this.props.value.exec().then(function (data) {
				return _this.setValue(data.result);
			}), this;
		}
		if (zn.is(value, 'object')) {
			var _item = null,
			    _value = null,
			    _text = null;
			setTimeout(function () {
				for (var key in this._items) {
					_item = this._items[key];
					_value = value[key];
					_text = value[key + '_convert'];
					if (_item && _value !== undefined) {
						_item.refs.input.setValue(_value, _text);
					}
				}
			}.bind(this), 0);
			this.setState({
				value: value
			});
		}

		return this;
	},
	getValue: function getValue() {},
	validate: function validate() {
		var _data = {},
		    _value = null;
		for (var name in this._items) {
			if (!this._items[name]) {
				continue;
			}
			_value = this._items[name].validate();
			if (_value !== null && _value !== undefined) {
				_data[name] = _value;
			} else {
				return false;
			}
		}

		return _data;
	},
	submit: function submit() {
		var _result = this.validate();
		if (_result === false) {
			return false;
		}

		for (var key in this.state.hiddens) {
			_result[key] = _result[key] || this.state.hiddens[key];
		}
		if (zn.DEBUG) {
			zn.debug("FormData", _result);
		}
		var _temp = this.props.onSubmitBefore && this.props.onSubmitBefore(_result, this);
		if (_temp !== false) {
			_result = _temp || _result;
		} else {
			return;
		}
		if (!this.props.action) {
			alert('Form action is undefined.');
			return;
		}
		this.loading(true);
		if (this.props.sync) {
			ReactDOM.findDOMNode(this).submit();
		} else {
			if (this.props.merge) {
				var _temp = {};
				_temp[this.props.merge] = _result;
				_result = _temp;
			}
			var _exts = this.props.exts;
			if (_exts) {
				for (var _key in _exts) {
					_result[_key] = _exts[_key];
				}
			}
			Store.request(this.props.action, _result, this.props.method).exec().then(this.__onSubmitCallbackHandler, function (data, xhr) {
				this.loading(false);
				this.props.onSubmitError && this.props.onSubmitError(data, this);
			}.bind(this));
		}
	},
	loading: function loading(_loading) {
		if (this._submit) {
			this._submit.loading(_loading);
		}
	},
	reset: function reset() {
		console.log('Form reset');
	},
	render: function render() {
		var _btns = this.props.btns;
		if (zn.is(_btns, 'array')) {
			_btns = { items: _btns };
		}
		if (this.props.sync) {
			var _hiddens = this.state.hiddens;
			return React.createElement(
				'form',
				{
					className: zn.react.classname('rt-form', this.props.className),
					encType: 'multipart/form-data',
					method: 'POST',
					style: this.props.style },
				Object.keys(_hiddens).map(function (hidden, index) {
					return React.createElement('input', { key: 'hidden_' + hidden, type: 'hidden', name: hidden, value: _hiddens[hidden] });
				}),
				React.createElement(RTList, _extends({}, this.props, { className: 'rt-form-items', style: null, itemRender: this.__itemRender })),
				React.createElement(ButtonGroup, _extends({}, _btns, { className: 'rt-form-btns', onClick: this.__onBtnsClick }))
			);
		} else {
			return React.createElement(
				'div',
				{ className: zn.react.classname('rt-form', this.props.className), style: this.props.style },
				React.createElement(RTList, _extends({}, this.props, { className: 'rt-form-items', style: null, itemRender: this.__itemRender })),
				React.createElement(ButtonGroup, _extends({}, _btns, { className: 'rt-form-btns', onClick: this.__onBtnsClick }))
			);
		}
	}
});