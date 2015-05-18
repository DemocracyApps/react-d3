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

    // Pull out any event handlers that the user has provided
    var onClickHandler = undefined;
    if (this.props.hasOwnProperty('eventHandlers')) {
      if (this.props.eventHandlers.hasOwnProperty('onClick')) {
        onClickHandler = this.props.eventHandlers.onClick.bind(null, props.dataContext);
      }
    }

    // Modify the label if it isn't likely to fit in the rectangle
    var avgCharWidth = 8;
    if (props.extraProperties.hasOwnProperty('avgCharWidth')) {
      avgCharWidth = props.extraProperties.avgCharWidth;
    }

    var label = props.label || "";
    if (label.length * avgCharWidth > props.width) {
      if (props.width/avgCharWidth < 6) {
        label = "";
      }
      else {
        var allowed = props.width/avgCharWidth - 3;
        label = label.substring(0,allowed) + "...";
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
          {label}
        </text>
      </g>
    );
  }
});
