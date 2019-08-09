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

const Breadcrumb = styled('div')`
  width: 100%;
  color: black;
`;

const BreadcrumbInner = styled('div')`
  max-width: 1170px;
  margin: 0.8125em auto;
`;

export default function Page({slug}) {
  const pageQuery = `
    *[_type == "page" && slug.current match '${slug}'] {
      ...,
      body[]{
        ...,
        _type == 'reference' => @->
      }
    }
  `;
  const [data, setData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await sanity.fetch(pageQuery);
      setData(result[0]);
      setDataFetched(true);
    };

    fetchData();
  }, [pageQuery]);

  return (
    <>
      <Banner data={data} />
      <Breadcrumb>
        <BreadcrumbInner>
          <div>LINK / LINK / LINK</div>
        </BreadcrumbInner>
      </Breadcrumb>
      <Main>
        <HomeBlock blocks={dataFetched ? data.body : ''} />
      </Main>
    </>
  );
}

Page.propTypes = {
  slug: PropTypes.string.isRequired
};
