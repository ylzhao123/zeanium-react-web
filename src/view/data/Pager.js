var React = require('react');

var Page = React.createClass({
	displayName: 'Page',
	getDefaultProps: function (){
		return {
			className: ''
		};
	},
	__onClick: function (){
		if(this.props.isDisabled){
			return false;
		}
		this.props.onClick && this.props.onClick();
	},
	render: function (){
		if(this.props.isHidden){
			return null;
		}
		return (
			<li onClick={this.__onClick} className={'page ' + this.props.className + ' '+ (this.props.isActive?"active":"") + ' '+ (this.props.isDisabled?"":"enabled")}>
				<span>{this.props.children}</span>
			</li>
		);
	}
});

var TITLES = {
    first:   <i className="fa fa-step-backward" />,
    prev:    <i className="fa fa-arrow-left" />,
    prevSet: <i className="fa fa-fast-backward" />,
    nextSet: <i className="fa fa-fast-forward" />,
    next:    <i className="fa fa-arrow-right" />,
    last:    <i className="fa fa-step-forward" />
};

function range ( start, end ) {
    var res = [];
    for ( var i = start; i < end; i++ ) {
        res.push( i );
    }

    return res;
}

module.exports = React.createClass({
	displayName:'Pager',
	getDefaultProps: function (){
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
	getInitialState: function (){
		return {

		}
	},

	componentWillReceiveProps: function (nextProps){

	},

	handleFirstPage: function () {
        if(this.isPrevDisabled()) return;
        this.handlePageChanged(1);
    },

    handlePreviousPage: function () {
        if(this.isPrevDisabled()) return;
        this.handlePageChanged(this.props.current - 1);
    },

    handleNextPage: function () {
        if(this.isNextDisabled()) return;
        this.handlePageChanged(this.props.current + 1);
    },

    handleLastPage: function () {
        if (this.isNextDisabled()) return;
        this.handlePageChanged(this.props.total);
    },

    /**
     * Chooses page, that is one before min of currently visible
     * pages.
     */
    handleMorePrevPages: function () {
        this.handlePageChanged(this.props.current - 1);
    },

    /**
     * Chooses page, that is one after max of currently visible
     * pages.
     */
    handleMoreNextPages: function () {
        var blocks = this.calcBlocks();
        this.handlePageChanged((blocks.current * blocks.size) + 1);
    },

    handlePageChanged: function ( pageIndex ) {
		this.props.onPageChanged && this.props.onPageChanged(pageIndex);
    },

	/* ========================= HELPERS ==============================*/
    /**
     * Calculates "blocks" of buttons with page numbers.
     */
    calcBlocks: function () {
        return {
            total: Math.ceil(this.props.total/this.props.visiblePages),
            current: Math.ceil(this.props.current/this.props.visiblePages),
            size: this.props.visiblePages
        };
    },

    isPrevDisabled: function () {
        return this.props.current <= 1;
    },

    isNextDisabled: function () {
        return this.props.current >= this.props.total;
    },

    isPrevMoreHidden: function () {
        var blocks = this.calcBlocks();
        return ( blocks.total === 1 ) || ( blocks.current === 1 );
    },

    isNextMoreHidden: function () {
        var blocks = this.calcBlocks();
        return ( blocks.total === 0 ) || ( blocks.current === blocks.total );
    },

    visibleRange: function () {
        var blocks  = this.calcBlocks(),
			start   = (blocks.current - 1) * blocks.size,
			delta   = this.props.total - start,
			end     = start + ( (delta > blocks.size) ? blocks.size : delta );

        return [ start + 1, end + 1 ];
    },

	/**
     * ### renderPages()
     * Renders block of pages' buttons with numbers.
     * @param {Number[]} range - pair of [start, from], `from` - not inclusive.
     * @return {React.Element[]} - array of React nodes.
     */
    renderPages: function ( pair ) {
        return range( pair[0], pair[1] ).map(function ( pageIndex, index ) {
            return (
				<Page key={index}
					isActive={this.props.current === pageIndex}
                    className="btn-numbered-page"
					onClick={()=>this.handlePageChanged(pageIndex)}>{pageIndex}</Page>
			);
        }.bind(this));
    },

    getTitles: function ( key ) {
        var pTitles = this.props.titles || {};
        return pTitles[ key ] || TITLES[ key ];
    },
	render:function(){
		var titles = this.getTitles;
		return (
			<nav className={"rt-pager " + this.props.className}>
				<ul className="pages">
					<Page className="btn-first-page"
						  key="btn-first-page"
						  isDisabled={this.isPrevDisabled()}
						  onClick={this.handleFirstPage}>{titles('first')}</Page>

					<Page className="btn-prev-page"
						  key="btn-prev-page"
						  isDisabled={this.isPrevDisabled()}
						  onClick={this.handlePreviousPage}>{titles('prev')}</Page>

					<Page className="btn-prev-more"
						  key="btn-prev-more"
						  isHidden={this.isPrevMoreHidden()}
						  onClick={this.handleMorePrevPages}>{titles('prevSet')}</Page>

					{this.renderPages( this.visibleRange() )}

					<Page className="btn-next-more"
						  key="btn-next-more"
						  isHidden={this.isNextMoreHidden()}
						  onClick={this.handleMoreNextPages}>{titles('nextSet')}</Page>

					<Page className="btn-next-page"
						  key="btn-next-page"
						  isDisabled={this.isNextDisabled()}
						  onClick={this.handleNextPage}>{titles('next')}</Page>

					<Page className="btn-last-page"
						  key="btn-last-page"
						  isDisabled={this.isNextDisabled()}
						  onClick={this.handleLastPage}>{titles('last')}</Page>
				</ul>
				{ !!this.props.total && (<span className="count">{this.props.current} / {this.props.total} Page</span>) }
				{ !!this.props.count && (<span className="count">{this.props.count} Row</span>) }
			</nav>
		);
	}
});
