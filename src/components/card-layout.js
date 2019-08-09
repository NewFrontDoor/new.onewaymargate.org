import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Card from './card';

const HomeSection = styled('div')`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const HomeSectionBackground = styled('section')`
  background-color: white;
  width: 100%;
  position: relative;
`;

const HomeSectionInner = styled('div')`
  grid-row: 2;
  max-width: 980px;
  margin: auto;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 6.25rem;
  padding-bottom: 6.25rem;
  text-align: center;
  font-family: rubik, proxima-nova, helvetica neue, arial, sans-serif;
  vertical-align: middle;
`;

export default function HomeBase({cards}) {
  return (
    <HomeSectionBackground>
      <HomeSection>
        <HomeSectionInner>
          {cards.map(card => (
            <Card card={card} />
          ))}
        </HomeSectionInner>
      </HomeSection>
    </HomeSectionBackground>
  );
}

HomeBase.propTypes = {
  heading: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
};
