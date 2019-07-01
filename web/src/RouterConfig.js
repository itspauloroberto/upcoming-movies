import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from 'antd';
import MovieList from './pages/MovieList';
import { Scrollbars } from 'react-custom-scrollbars';

const getPageWithLayout = page => (
  <Layout>
    <Scrollbars
      autoHide={true}
      autoHideTimeout={10}
      style={{ height: '100vh' }}>
        { page }
    </Scrollbars>
  </Layout>
);

const RouterConfig = () => (
  <Router>
    <Route
      exact
      path="/"
      component={() => getPageWithLayout(<MovieList />) }
    />
  </Router>
);

export default RouterConfig;