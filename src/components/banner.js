import React from 'react';
import styled from '@emotion/styled';
import {readableColor} from 'polished';
import urlFor from '../lib/sanityImg';

const BannerWrapper = styled('div')`
  position: relative;
  width: 100%;
  background-color: #e7e3d4;
`;

const BannerImage = styled('div')`
  opacity: ${props => (props.image ? '0.25' : '0')};
  background-image: url(${props => urlFor(props.image).url()});
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: black;
`;

const BannerInner = styled('div')`
  display: table;
  color: ${readableColor('#E7E3D4')};
  position: relative;
  height: 100%;
  padding: 8% 0;
  max-width: 980px;
  margin: auto;
  h1 {
    margin-top: 90px;
    font-weight: 700;
    font-size: 36px;
    line-height: 1.2;
    @media screen and (min-width: 768px) {
      font-size: 58px;
    }
  }
`;

export default function Banner({data}) {
  return (
    <BannerWrapper>
      <BannerImage image={data ? data.mainImage : ''} />
      <BannerInner>
        <h1>{data ? data.title : ''}</h1>
      </BannerInner>
    </BannerWrapper>
  );
}
