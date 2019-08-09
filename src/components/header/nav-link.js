import React from 'react';
import styled from '@emotion/styled';
import {NavHashLink as NavLink} from 'react-router-hash-link';

const ListItem = styled('li')`
  line-height: 1.6;
  padding: 0;
  @media screen and (min-width: 768px) {
    margin: 0.3125em 0 0 1.25em;
    line-height: initial;
  }
`;
const Anchor = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  font-family: 'Rubik';
  font-weight: 700;
  @media screen and (min-width: 768px) {
    color: white;
  }
`;

const Navlink = props => (
  <ListItem
    isHighlighted={
      props.link === document.location.pathname + document.location.hash
    }
  >
    <Anchor
      to={props.link}
      location={{pathname: document.location.pathname + document.location.hash}}
    >
      {props.text}
    </Anchor>
  </ListItem>
);

export default Navlink;
