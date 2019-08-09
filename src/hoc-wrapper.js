import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import sanity from './lib/sanity';
import Header from './components/Header';
import Footer from './components/Footer';
import Page from './routes/Page';

export default function HOC({navlinks, logo, location}) {
  console.log(location);
  const pageQuery = `
    *[_type == "page" && slug.current match '${location.pathname.substring(1)}']
  `;

  const [data, setData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  async function fetchData() {
    const result = await sanity.fetch(pageQuery);
    setData(result[0]);
    setDataFetched(true);
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return dataFetched ? (
    <>
      <Header data={data} navlinks={navlinks} logo={logo} />
      <Page data={data} />
      <Footer />
    </>
  ) : (
    ''
  );
}

HOC.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      _createdAt: PropTypes.string.isRequired,
      body: PropTypes.string,
      categories: PropTypes.string.isRequired
    })
  ).isRequired
};
