'use strict';

var React = require('react');
var d3 = require('d3');


module.exports = React.createClass({

  displayName: 'Cell',

  propTypes: {
    fill: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    label: React.PropTypes.string
  },

  render() {

    var props = this.props;
    
    var textStyle = {
      'textAnchor': 'middle',
      'fill': props.textColor,
      'fontSize': props.fontSize
    };
    var onClickHandler = undefined;
    if (this.props.hasOwnProperty('eventHandlers')) {
      if (this.props.eventHandlers.hasOwnProperty('onClick')) {
        onClickHandler = this.props.eventHandlers.onClick.bind(null, props.dataContext);
      }
    }

    var t = `translate(${props.x}, ${props.y}  )`;
    return (
      <g transform={t}>
        <rect
          className='rd3-treemap-cell'
          width={props.width}
          height={props.height}
          fill={props.fill} 
          onMouseOver={props.handleMouseOver}
          onMouseLeave={props.handleMouseLeave}
          onClick = {onClickHandler}
        />
        <text
          x={props.width / 2}
          y={props.height / 2}
          dy='.35em'
          style={textStyle}
          className='rd3-treemap-cell-text'
          onClick = {onClickHandler}
        >
          {props.label}
        </text>
      </g>
    );
  }
});
