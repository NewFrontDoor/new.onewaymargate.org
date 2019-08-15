import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import HomeBlock from '../components/home-block-text-serializer';
import Banner from '../components/banner';
import sanity from '../lib/sanity';
import SermonLayout from '../components/sermon-layout';

const sampleData = [
  {
    id: 'sermon1',
    title: 'The first Sermon',
    date: '1st april 2001',
    preacher: 'Mikey Lunch',
    series: 'Good Book',
    book: '1 Corinthians'
  },
  {
    id: 'sermon2',
    title: 'Sermon, the second',
    date: '8th April 2001',
    preacher: 'Lynchpin',
    series: 'Good Book',
    book: '1 Corinthians'
  },
  {
    id: 'sermon3',
    title: 'Three',
    date: '15th April 2001',
    preacher: 'Mickey',
    series: 'Good Book',
    book: '1 Corinthians'
  }
];

const Main = styled('article')`
  max-width: 1170px;
  margin: auto;
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

  console.log(data);

  console.log(dataFetched);
  
  return dataFetched ? (
    <>
      <Banner data={data} />
      <Main>
        {data.body ? <HomeBlock blocks={data.body} /> : ''}
        <SermonLayout sermons={sampleData} />
      </Main>
    </>
  ) : (
    ''
  );
}

Page.propTypes = {
  slug: PropTypes.string.isRequired
};
