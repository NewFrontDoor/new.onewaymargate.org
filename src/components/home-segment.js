import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {readableColor} from 'polished';
import {Link} from 'react-router-dom';
import urlFor from '../lib/sanityImg';
import HomeBlock from './home-block-text-serializer';

const Container = styled('div')`
  display: grid;
  ${props => (props.areas ? `grid-template-areas: ${props.areas};` : '')};
  grid-gap: 30px;
  grid-template-columns: 1fr 80px 80px 1fr;
  height: 80px;
  @media (min-width: 420px) {
    ${props =>
      props.areasDesktop ? `grid-template-areas: ${props.areasDesktop};` : ''};
    grid-template-columns: ${props => props.columns};
    grid-template-rows: ${props => props.rows};
    grid-gap: ${props => props.columnGap};
    height: auto;
  }
`;

const Action = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 0.125em 0.9375rem 0;
  font-size: 0.95em;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid;
  border-color: ${props =>
    props.displayStyle.style === 'custom'
      ? readableColor(props.displayStyle.custom_color.hex)
      : textColors[props.displayStyle.style]};
  border-radius: 50%;
  grid-column-start: ${props => props.column};
  color: ${props =>
    props.displayStyle.style === 'custom'
      ? readableColor(props.displayStyle.custom_color.hex)
      : textColors[props.displayStyle.style]};
  :hover {
    background-color: ${props =>
      props.displayStyle.style === 'custom'
        ? readableColor(props.displayStyle.custom_color.hex)
        : textColors[props.displayStyle.style]};
    color: ${props =>
      props.displayStyle.style === 'custom'
        ? props.displayStyle.custom_color.hex
        : overlayColors[props.displayStyle.style]};
    cursor: pointer;
  }
`;

const HomeH1 = styled('h1')`
  margin-bottom: 35px;
  font-size: 36px;
  font-weight: 700;
  margin-top: 0;
  line-height: 1.2;
  @media (min-width: 420px) {
    font-size: 58px;
  }
`;

const HomeBlurb = styled('p')`
  font-size: 1.8rem;
  font-weight: 400 !important;
  margin-top: 2.1875rem;
  margin-bottom: 2.1875rem;
`;

const overlayColors = {
  blue: '#007dc5',
  light: 'white',
  dark: '#3b3a3c'
};

const textColors = {
  blue: 'white',
  light: 'black',
  dark: 'white',
  custom: 'black'
};

const opacities = {
  blue: 0.15,
  light: 0.2,
  dark: 0.2,
  custom: 0.15
};

const HomeSection = styled('div')`
  position: relative;
  z-index: 1;
  height: ${props => (props.firstpage ? '100vh' : 'calc(100vh - 100px)')};
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  color: ${props =>
    props.displayStyle.style === 'custom'
      ? readableColor(props.displayStyle.custom_color.hex)
      : textColors[props.displayStyle.style]};
`;

const HomeSectionBackground = styled('section')`
  background-color: ${props =>
    props.displayStyle.style === 'custom'
      ? props.displayStyle.custom_color.hex
      : overlayColors[props.displayStyle.style]};
  width: 100%;
  position: relative;
`;

const HomeSectionBackgroundImage = styled('div')`
  background-image: url(${props => props.background});
  opacity: ${props => opacities[props.displayStyle]};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
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

const Arrow = styled('div')`
  grid-row: 3;
  margin: auto;
`;

export default function HomeLayout({
  heading,
  blurb,
  actions,
  background,
  displayStyle,
  firstpage
}) {
  return (
    <HomeSectionBackground displayStyle={displayStyle}>
      <HomeSectionBackgroundImage
        background={urlFor(background).url()}
        displayStyle={displayStyle.style}
      />
      <HomeSection displayStyle={displayStyle} firstpage={firstpage}>
        <HomeSectionInner>
          <HomeH1>{heading}</HomeH1>
          {blurb ? (
            <HomeBlurb>
              <HomeBlock blocks={blurb} />
            </HomeBlurb>
          ) : (
            ''
          )}
          {actions.length > 0 ? (
            <Container
              columns={`auto repeat(${actions.length}, 7.25rem) auto`}
              rows="7.25rem"
              columnGap="1.5rem"
              rowGap="1.5rem"
            >
              {actions.map((link, index) => {
                console.log(link);
                return (
                  <Action
                    key={link.text}
                    to={`/${link.slug}`}
                    column={index + 2}
                    displayStyle={displayStyle}
                  >
                    {link.text}
                  </Action>
                );
              })}
            </Container>
          ) : (
            ''
          )}
        </HomeSectionInner>
        {firstpage ? (
          <Arrow>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="1.5"
              clipRule="evenodd"
              viewBox="0 0 50 27"
              width="50px"
            >
              <path
                fill="none"
                stroke="rgba(0,0,0,.2)"
                strokeWidth="2"
                d="M0 0l25 25L50 0"
                transform="matrix(.96 0 0 1 1 1)"
              />
            </svg>
          </Arrow>
        ) : (
          ''
        )}
      </HomeSection>
    </HomeSectionBackground>
  );
}

HomeLayout.propTypes = {
  heading: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
};
