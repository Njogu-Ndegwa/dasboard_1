import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { view as Loading } from './components/loading';
import { view as Home } from './pages';
import { authRoutes } from './routes';

function App() {
  return (
    <div>
      <Loading />
      <Switch>
        {authRoutes.map((route, idx) => {
          return route.component ? (  
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={props => <route.component {...props} />}
             
            />
          ) : null;
        })}
        <Route path="/" name="Home" component={Home} />
      </Switch>
    </div>
  );
}

export default App
