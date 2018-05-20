import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Preloader = ({ show }) => (
  <div className={cs('preloader', { preloader_show: show })}>
    <div className="preloader__b preloader__b_1" />
    <div className="preloader__b preloader__b_2" />
  </div>
);

Preloader.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Preloader;
