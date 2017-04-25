'use strict';

var React = require('react');

var Page = React.createClass({
  displayName: 'Page',
  getDefaultProps: function getDefaultProps() {
    return {
      className: ''
    };
  },
  __onClick: function __onClick() {
    if (this.props.isDisabled) {
      return false;
    }
    this.props.onClick && this.props.onClick();
  },
  render: function render() {
    if (this.props.isHidden) {
      return null;
    }
    return React.createElement(
      'li',
      { onClick: this.__onClick, className: 'page ' + this.props.className + ' ' + (this.props.isActive ? "active" : "") + ' ' + (this.props.isDisabled ? "" : "enabled") },
      React.createElement(
        'span',
        null,
        this.props.children
      )
    );
  }
});

var TITLES = {
  first: React.createElement('i', { className: 'fa fa-step-backward' }),
  prev: React.createElement('i', { className: 'fa fa-arrow-left' }),
  prevSet: React.createElement('i', { className: 'fa fa-fast-backward' }),
  nextSet: React.createElement('i', { className: 'fa fa-fast-forward' }),
  next: React.createElement('i', { className: 'fa fa-arrow-right' }),
  last: React.createElement('i', { className: 'fa fa-step-forward' })
};

function range(start, end) {
  var res = [];
  for (var i = start; i < end; i++) {
    res.push(i);
  }

  return res;
}

module.exports = React.createClass({
  displayName: 'Pager',
  getDefaultProps: function getDefaultProps() {
    return {
      className: ''
    };
  },
  propTypes: {
    current: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired,
    visiblePages: React.PropTypes.number.isRequired,
    titles: React.PropTypes.object,
    onPageChanged: React.PropTypes.func,
    onPageSizeChanged: React.PropTypes.func
  },
  getInitialState: function getInitialState() {
    return {};
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},

  handleFirstPage: function handleFirstPage() {
    if (this.isPrevDisabled()) return;
    this.handlePageChanged(1);
  },

  handlePreviousPage: function handlePreviousPage() {
    if (this.isPrevDisabled()) return;
    this.handlePageChanged(this.props.current - 1);
  },

  handleNextPage: function handleNextPage() {
    if (this.isNextDisabled()) return;
    this.handlePageChanged(this.props.current + 1);
  },

  handleLastPage: function handleLastPage() {
    if (this.isNextDisabled()) return;
    this.handlePageChanged(this.props.total);
  },

  /**
   * Chooses page, that is one before min of currently visible
   * pages.
   */
  handleMorePrevPages: function handleMorePrevPages() {
    this.handlePageChanged(this.props.current - 1);
  },

  /**
   * Chooses page, that is one after max of currently visible
   * pages.
   */
  handleMoreNextPages: function handleMoreNextPages() {
    var blocks = this.calcBlocks();
    this.handlePageChanged(blocks.current * blocks.size + 1);
  },

  handlePageChanged: function handlePageChanged(pageIndex) {
    this.props.onPageChanged && this.props.onPageChanged(pageIndex);
  },

  /* ========================= HELPERS ==============================*/
  /**
   * Calculates "blocks" of buttons with page numbers.
   */
  calcBlocks: function calcBlocks() {
    return {
      total: Math.ceil(this.props.total / this.props.visiblePages),
      current: Math.ceil(this.props.current / this.props.visiblePages),
      size: this.props.visiblePages
    };
  },

  isPrevDisabled: function isPrevDisabled() {
    return this.props.current <= 1;
  },

  isNextDisabled: function isNextDisabled() {
    return this.props.current >= this.props.total;
  },

  isPrevMoreHidden: function isPrevMoreHidden() {
    var blocks = this.calcBlocks();
    return blocks.total === 1 || blocks.current === 1;
  },

  isNextMoreHidden: function isNextMoreHidden() {
    var blocks = this.calcBlocks();
    return blocks.total === 0 || blocks.current === blocks.total;
  },

  visibleRange: function visibleRange() {
    var blocks = this.calcBlocks(),
        start = (blocks.current - 1) * blocks.size,
        delta = this.props.total - start,
        end = start + (delta > blocks.size ? blocks.size : delta);

    return [start + 1, end + 1];
  },

  /**
      * ### renderPages()
      * Renders block of pages' buttons with numbers.
      * @param {Number[]} range - pair of [start, from], `from` - not inclusive.
      * @return {React.Element[]} - array of React nodes.
      */
  renderPages: function renderPages(pair) {
    return range(pair[0], pair[1]).map(function (pageIndex, index) {
      var _this = this;

      return React.createElement(
        Page,
        { key: index,
          isActive: this.props.current === pageIndex,
          className: 'btn-numbered-page',
          onClick: function onClick() {
            return _this.handlePageChanged(pageIndex);
          } },
        pageIndex
      );
    }.bind(this));
  },

  getTitles: function getTitles(key) {
    var pTitles = this.props.titles || {};
    return pTitles[key] || TITLES[key];
  },
  render: function render() {
    var titles = this.getTitles;
    return React.createElement(
      'nav',
      { className: "rt-pager " + this.props.className },
      React.createElement(
        'ul',
        { className: 'pages' },
        React.createElement(
          Page,
          { className: 'btn-first-page',
            key: 'btn-first-page',
            isDisabled: this.isPrevDisabled(),
            onClick: this.handleFirstPage },
          titles('first')
        ),
        React.createElement(
          Page,
          { className: 'btn-prev-page',
            key: 'btn-prev-page',
            isDisabled: this.isPrevDisabled(),
            onClick: this.handlePreviousPage },
          titles('prev')
        ),
        React.createElement(
          Page,
          { className: 'btn-prev-more',
            key: 'btn-prev-more',
            isHidden: this.isPrevMoreHidden(),
            onClick: this.handleMorePrevPages },
          titles('prevSet')
        ),
        this.renderPages(this.visibleRange()),
        React.createElement(
          Page,
          { className: 'btn-next-more',
            key: 'btn-next-more',
            isHidden: this.isNextMoreHidden(),
            onClick: this.handleMoreNextPages },
          titles('nextSet')
        ),
        React.createElement(
          Page,
          { className: 'btn-next-page',
            key: 'btn-next-page',
            isDisabled: this.isNextDisabled(),
            onClick: this.handleNextPage },
          titles('next')
        ),
        React.createElement(
          Page,
          { className: 'btn-last-page',
            key: 'btn-last-page',
            isDisabled: this.isNextDisabled(),
            onClick: this.handleLastPage },
          titles('last')
        )
      ),
      !!this.props.total && React.createElement(
        'span',
        { className: 'count' },
        this.props.current,
        ' / ',
        this.props.total,
        ' Page'
      ),
      !!this.props.count && React.createElement(
        'span',
        { className: 'count' },
        this.props.count,
        ' Row'
      )
    );
  }
});