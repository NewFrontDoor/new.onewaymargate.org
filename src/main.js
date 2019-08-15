/** @jsx jsx */
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {css, jsx} from '@emotion/core';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './routes/home';
import Page from './routes/page';
import Sermons from './routes/sermons';

const body = css`
  font-family: 'Rubik';
  color: white;
`;

export default function Main({mainData: {menuData, mainData}, pagesData}) {
  return (
    <BrowserRouter>
      <div css={body}>
        <Header navlinks={menuData.menuitems} />
        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL + '/'}
            render={() => <Home content={mainData.content} />}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/talks'}
            render={({match}) => (
              <Sermons
                slug="talks"
                pageData={pagesData ? pagesData[match.params.slug] : undefined}
              />
            )}
          />
          <Route
            path="/:slug"
            render={({match}) => (
              <Page
                slug={match.params.slug}
                pageData={pagesData ? pagesData[match.params.slug] : undefined}
              />
            )}
          />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

Main.propTypes = {
  mainData: PropTypes.object.isRequired,
  pagesData: PropTypes.object
};
