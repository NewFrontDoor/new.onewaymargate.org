/** @jsx jsx */
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {css, jsx} from '@emotion/core';
import NavBar from './components/header/nav-bar';
import Footer from './components/footer/footer';
import Home from './routes/home';
import Page from './routes/page';
import Sermons from './routes/sermons';

const body = css`
  font-family: 'Rubik';
  color: white;
`;

export default function Main({theData: {menuData, mainData, logo}}) {
  return (
    <BrowserRouter>
      <div css={body}>
        <NavBar navlinks={menuData.menuitems} logo={logo[0].logo} />
        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL + '/'}
            render={() => <Home content={mainData.content} />}
          />
          <Route path="/:slug" component={Slug} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function Slug({match}) {
  if (match.params.slug === 'sermons') {
    return <Sermons slug={match.params.slug} />;
  }

  return <Page slug={match.params.slug} />;
}

Main.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      _createdAt: PropTypes.string.isRequired,
      body: PropTypes.string,
      categories: PropTypes.string.isRequired
    })
  ).isRequired
};
