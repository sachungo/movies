import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = props => (
  <svg width={props.width} height={props.height} viewBox="0 0 128 128">
    <rect width="100%" height="100%" fill={props.backgroundFill} />
    <g>
      <linearGradient id="a">
        <stop offset="0%" stopColor={props.secondaryColor} fillOpacity={props.fillOpacity} />
        <stop offset="100%" stopColor={props.primaryColor} />
      </linearGradient>
      <path
        d="M63.85 0A63.85 63.85 0 1 1 0 63.85 63.85 63.85 0 0 1 63.85 0zm.65 19.5a44 44 0 1 1-44 44 44 44 0 0 1 44-44z"
        fill="url(#a)"
        fillRule="evenodd"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 64 64"
        to="360 64 64"
        dur="1080ms"
        repeatCount="indefinite"
      />
    </g>
  </svg>
);

LoadingSpinner.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundFill: PropTypes.string,
  secondaryColor: PropTypes.string,
  primaryColor: PropTypes.string,
  fillOpacity: PropTypes.number
};

LoadingSpinner.defaultProps = {
  width: 60,
  height: 60,
  backgroundFill: '#ffffff',
  secondaryColor: '#ffffff',
  primaryColor: '#000000',
  fillOpacity: 0
};

export default LoadingSpinner;
