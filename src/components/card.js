import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import urlFor from '../lib/sanityImg';
import HomeBlock from './HomeBlock';

export default function Card({card}) {
  return (
    <div>
      <h3>{card.title}</h3>
      <img src={urlFor(card.image).url()} />
      <HomeBlock blocks={card.body} />
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      body: PropTypes.obj.isRequired
    })
  ).isRequired
};
