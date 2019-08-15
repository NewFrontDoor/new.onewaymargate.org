import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import HomeBlock from '../components/home-block-text-serializer';
import Banner from '../components/banner';
import sanity from '../lib/sanity';

const Main = styled('article')`
  max-width: 700px;
  margin: auto;
  padding: 15px;
  font-size: 1.15em;
  line-height: 1.8;
  color: #444444;
`;

export default function Page({slug, pageData}) {
  const [data, setData] = useState(pageData);
  const [dataFetched, setDataFetched] = useState(Boolean(pageData));

  const pageQuery = `
    *[_type == "page" && slug.current match '${slug}'] {
      ...,
      body[]{
        ...,
        _type == 'reference' => @->
      }
    }
  `;

  useEffect(() => {
    const fetchData = async () => {
      const result = await sanity.fetch(pageQuery);
      setData(result[0]);
      setDataFetched(true);
    };

    if (dataFetched === false) {
      fetchData();
    } else {
      setData(pageData);
    }
  }, [dataFetched, slug, pageData, pageQuery]);

  return dataFetched ? (
    <>
      <Banner data={data} />
      <Main>
        <HomeBlock blocks={data.body} />
      </Main>
    </>
  ) : (
    ''
  );
}

Page.propTypes = {
  slug: PropTypes.string.isRequired,
  pageData: PropTypes.object
};