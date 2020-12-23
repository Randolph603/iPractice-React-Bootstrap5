import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import album from './BootstrapPages/album/album';
import blog from './BootstrapPages/blog/blog';
import main from './main';
import MsalPage from './MsalPage/MsalPage';
import BoxingDBClient from './WechatDB/BoxingDBClient';

export default function App() {
  return (
    <Router>
      <Switch>
        {/* <Redirect from='/' to={'/msal-page'} exact={true} /> */}
        <Route path='/list' component={main} />
        <Route path='/' component={MsalPage} exact={true} />
        <Route path='/wechat' component={BoxingDBClient} />
        <Route path='/bootstrap/album' component={album} />
        <Route path='/bootstrap/blog' component={blog} />
      </Switch>
    </Router>
  );
}
