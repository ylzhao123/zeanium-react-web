var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'Select',
	propTypes: {
		textKey: React.PropTypes.string,
		valueKey: React.PropTypes.string
	},
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			autoLoad: true,
			textKey: 'text',
			valueKey: 'value',
			placeholder: "Please Choose..."
		};
	},
	getInitialState: function getInitialState() {
		return {
			loading: false,
			currIndex: null,
			value: this.props.value || '',
			data: []
		};
	},
	componentDidMount: function componentDidMount() {
		var _source = this.props.data || this.props.items;
		this._dataSource = Store.dataSource(_source, {
			autoLoad: this.props.autoLoad,
			onExec: function () {
				var _result = this.props.onLoading && this.props.onLoading();
				if (_result !== false && this.isMounted()) {
					this.setState({
						loading: true
					});
				}
			}.bind(this),
			onSuccess: function (data) {
				this.__onDataLoaded(this.__dataHandler(data));
				this.props.onData && this.props.onData(data);
			}.bind(this)
		});
	},
	__dataHandler: function __dataHandler(data) {
		if (this.props.dataHandler) {
			return this.props.dataHandler(data);
		}

		return data.result || data;
	},
	__onDataLoaded: function __onDataLoaded(data) {
		if (!this.isMounted()) {
			return false;
		}
		var _value = this.props.value,
		    _valueKey = this.props.valueKey;

		if (data.length == undefined) {
			var temp = [];
			for (var key in data) {
				temp.push(data[key]);
			}
			data = temp;
		}
		this.state.data = data;
		this.setState({ data: data, loading: false }, function () {
			if (_value) {
				this.setValue(_value);
			}
			this.props.onLoaded && this.props.onLoaded(data, this);
		}.bind(this));
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			//this._dataSource.reset(nextProps.data);
		}
	},
	request: function request(data, argv) {
		this._dataSource.reset(data, argv);
	},
	filter: function filter(handler) {
		var _data = [];
		this.state.data.forEach(function (item, index, array) {
			if (handler(item, index, array) !== false) {
				_data.push(item);
			}
		});

		this.setState({ data: _data });
	},
	refresh: function refresh() {
		this._dataSource.refresh();
	},
	__onSelectClick: function __onSelectClick(event) {
		if (!this.props.autoLoad) {
			this._dataSource.exec();
		}
		event.stopPropagation();
		event.preventDefault();
	},
	__parseExp: function __parseExp(item, exp) {
		if (typeof exp == 'string') {
			if (exp.indexOf('{') != -1) {
				return zn.format(exp, item);
			} else {
				return item[exp];
			}
		} else if (typeof exp == 'function') {
			return exp(item);
		}
	},
	__itemRender: function __itemRender(item, index) {
		item = item || {};
		if (typeof item === 'string') {
			var _temp = {};
			_temp[this.props.valueKey] = _temp[this.props.textKey] = item;
			this.state.data[index] = item = _temp;
		}
		item.index = index;

		var _value = this.__parseExp(item, this.props.valueKey),
		    _text = this.__parseExp(item, this.props.textKey);
		return React.createElement(
			'option',
			{ key: index, value: _value },
			_text
		);
	},
	__onSelectChange: function __onSelectChange(event) {
		var _target = event.target,
		    _selectedIndex = +_target.selectedIndex - 1,
		    _item = this.state.data[_selectedIndex],
		    _value = this.__parseExp(_item, this.props.valueKey),
		    _text = this.__parseExp(_item, this.props.textKey);

		var _data = {
			selectedIndex: _selectedIndex,
			text: _text,
			value: _value,
			item: _item
		};
		this.setValue(_value, event);
	},
	getValue: function getValue() {
		return this.state.value || ReactDOM.findDOMNode(this).value;
	},
	setValue: function setValue(value, event) {
		//console.log('Value: ', value, this.props.name);
		this.setState({
			value: value
		}, function () {
			var _item = null,
			    _valueKey = this.props.valueKey;
			if (this.state.data && this.state.data.length) {
				for (var i = 0, _len = this.state.data.length; i < _len; i++) {
					if (value == this.state.data[i][_valueKey]) {
						_item = this.state.data[i];
					}
				}
			}
			this.props.onChange && this.props.onChange(_item, this, event);
		});
	},
	render: function render() {
		return React.createElement(
			'select',
			{
				className: 'rt-select',
				style: this.props.style,
				name: this.props.name,
				disabled: this.props.disabled || this.props.readonly,
				value: this.state.value,
				onChange: this.__onSelectChange,
				onClick: this.__onSelectClick },
			React.createElement(
				'option',
				{ value: '', disabled: true },
				this.props.placeholder
			),
			this.state.data && this.state.data.map && this.state.data.map(this.__itemRender)
		);
	}
});