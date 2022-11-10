import React from 'react';
import PropTypes from 'prop-types';
import { IoSnowOutline } from 'react-icons/io5';
import { GiSnowman, GiWinterGloves } from 'react-icons/gi';
import { SiSnowflake } from 'react-icons/si';
import Cube from './Cube';

function Logo({ componentsAlignProperties, textSizeProperty, componentsFlexDirectionProperty }) {
  return (
    <div className={`flex ${componentsAlignProperties} gap-2 ${textSizeProperty} ${componentsFlexDirectionProperty}`}>
      <h1 className="sm:text-center">marmalade</h1>
      <div className="flex flex-row gap-1">
        <Cube letter="c" colorCode="#de0e7a" emotion={<IoSnowOutline />} />
        <Cube letter="r" colorCode="#075ca4" emotion={<GiSnowman />} />
        <Cube letter="e" colorCode="#009a72" emotion={<SiSnowflake />} />
        <Cube letter="w" colorCode="#f1d76c" emotion={<GiWinterGloves />} />
      </div>
    </div>
  );
}

Logo.propTypes = {
  componentsAlignProperties: PropTypes.string,
  textSizeProperty: PropTypes.string.isRequired,
  componentsFlexDirectionProperty: PropTypes.string,
};

Logo.defaultProps = {
  componentsAlignProperties: 'justify-center items-center sm:items-start',
  componentsFlexDirectionProperty: 'flex-col sm:flex-row',
};

export default Logo;
