import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Connections from './containers/connections/Connections';
import Datasets from './containers/datasets/Datasets';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/connections" component={Connections} />
          <Route path="/datasets" component={Datasets} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
