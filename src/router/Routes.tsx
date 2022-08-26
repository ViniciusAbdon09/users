import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import NewUser from '../pages/NewUser';
import EditUser from '../pages/EditUser';

export default function Routes () {
  return(
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/new' component={NewUser}/>
      <Route path='/edit/:id' component={EditUser}/>
    </Switch>
  )
}
