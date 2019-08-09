import React, {useState, useEffect} from 'react';
import {createTheme, ThemeProvider} from 'mineral-ui/themes';
import sanity from './lib/sanity';
import Main from './main';

const mainQuery = `
*[_type == "main"][0] {
  content[]->{
    actions[]{
      text,
      "slug": link->slug.current
    },
    background,
    blurb,
    details,
    heading,
    styling,
    location
  }
}
`;

const menuQuery = `
*[_type == "main"][0] {
  menuitems[]{
    text,
    childpages[]->{
      title,
      slug,
      'pathname': '/' + slug.current
    }
  }
}
`;

const configQuery = `
*[_type == "config"]{
  logo
}`;

const myTheme = createTheme({
  colors: {theme: 'red'},
  overrides: {
    fontFamily: 'Rubik'
  }
});

export default function App() {
  const [theData, setTheData] = useState();
  const [dataFetched, setFetched] = useState(false);

  useEffect(() => {
    const allQuery = `
      {
        'menuData': ${menuQuery},
        'mainData': ${mainQuery},
        'logo': ${configQuery}
      }
    `;

    async function fetchData() {
      const result = await sanity.fetch(allQuery);
      console.log(result);
      setTheData(result);
      setFetched(true);
    }

    fetchData();
  }, []);

  return dataFetched === true ? (
    <ThemeProvider theme={myTheme}>
      <Main theData={theData} />
    </ThemeProvider>
  ) : (
    ''
  );
}
