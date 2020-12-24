import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Connections from './containers/connections/Connections';
import Datasets from './containers/datasets/Datasets';
import Users from './containers/users/Users';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/connections" component={Connections} />
          <Route path="/datasets" component={Datasets} />
          <Route path="/users" component={Users} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
