import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout } from 'antd';
import RouterConfig from './RouterConfig';

class Main extends Component {
  render() {
    return (
      <div className="App">
        <Layout style={{ height: '100vh', background: '#151515' }}>
          <RouterConfig />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);