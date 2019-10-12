import React, {useState, useEffect} from 'react';
import {createTheme, ThemeProvider} from 'mineral-ui/themes';
import sanity from './lib/sanity';
import Main from './main';

const mainQuery = `
*[_type == "main"][0] {
  content[]->{
    actions[]{
      text,
      "slug": link->slug.current,
      directions
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

const pagesQuery = `
  *[_type == "page"] {
    ...,
      body[]{
        ...,
        _type == 'reference' => @-> {
          ...,
          blocks[] {
            ...,
            _type == 'reference' => @ ->
          }
        },
        markDefs[] {
          ...,
          _type == 'internalLink' => {
              'slug': @.reference->slug.current
          }
        }
      },
      'id': _id,
    'pathname': '/' + slug.current
  }
`;

const myTheme = createTheme({
  colors: {theme: 'red'},
  overrides: {
    fontFamily: 'Rubik'
  }
});

export default function App() {
  const [mainData, setMainData] = useState();
  const [pagesData, setPagesData] = useState();
  const [mainFetch, setMainFetch] = useState(false);

  useEffect(() => {
    const allQuery = `
      {
        'menuData': ${menuQuery},
        'mainData': ${mainQuery}
      }
    `;

    async function fetchData() {
      const result = await sanity.fetch(allQuery);
      setMainData(result);
      setMainFetch(true);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await sanity.fetch(pagesQuery);

      const arrayToObject = array =>
        array.reduce((obj, item) => {
          obj[item.slug.current] = item;
          return obj;
        }, {});

      const pagesObject = arrayToObject(result);

      setPagesData(pagesObject);
    }

    fetchData();
  }, [mainFetch]);

  return mainFetch === true ? (
    <ThemeProvider theme={myTheme}>
      <Main mainData={mainData} pagesData={pagesData} />
    </ThemeProvider>
  ) : (
    ''
  );
}
