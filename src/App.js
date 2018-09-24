import React, { Component } from 'react';
import Table from './table';
import { $ButtonText } from "./common/js/config";
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Table ButtonText={$ButtonText} title={'Edited by @falltints'}/>
      </Provider>
    );
  }
}

export default App;
