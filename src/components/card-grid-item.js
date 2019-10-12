import React from 'react';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import urlFor from '../lib/sanityImg';

const Actions = styled('section')`
  grid-column: 1/1;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-evenly;
  width: 50%;
  margin: auto;
  button {
    background: none;
    text-transform: lowercase;
    font-size: 0.8em;
    padding: 10px 15px 10px 15px;
  }
`;

const Action = styled(Link)`
  text-decoration: none;
  padding: 10px 0;
  font-size: 0.8em;
  text-transform: uppercase;
  border: 1px solid;
  border-color: #444446;
  border-radius: 40px;
  grid-column-start: NaN;
  color: #444446;
  width: 7.25rem;
  :hover {
    background-color: #444446;
    color: white;
    cursor: pointer;
  }
  @media (min-width: 420px) {
    grid-column-start: ${props => props.column + 2};
  }
`;

const Header = styled('h3')`
  grid-column: 1/1;
  max-width: 100%;
  text-align: center;
  margin: 0.5em;
`;

const Image = styled.img`
  grid-column: 1/1;
  width: 100%;
`;

export default function Card({
  title,
  shortdescription,
  mainImage,
  action,
  slug
}) {
  return (
    <>
      <Image
        src={urlFor(mainImage)
          .width(530)
          .height(135)
          .auto('format')
          .url()}
        alt={title}
      />
      <Header>{title}</Header>
      <Actions>
        <Action to={slug.current}>{action ? action : 'VIEW PAGE'}</Action>
      </Actions>
    </>
  );
}
