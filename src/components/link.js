import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'react-router-dom/Link';
import MineralLink from 'mineral-ui/Link';

const Link = props => (
  <MineralLink
    element={RouterLink}
    to={{
      pathname: '/blog',
      search: `?category=${props.title}`
    }}
  >
    {props.title}
  </MineralLink>
);

Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string.isRequired,
  prefetch: PropTypes.bool
};

Link.defaultProps = {
  as: undefined,
  prefetch: false
};

export default Link;
