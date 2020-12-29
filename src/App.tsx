import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import album from './BootstrapPages/album/album';
import blog from './BootstrapPages/blog/blog';
import carousel from './BootstrapPages/carousel/carousel';
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
        <Route path='/bootstrap5/album' component={album} />
        <Route path='/bootstrap5/blog' component={blog} />
        <Route path='/bootstrap5/carousel' component={carousel} />
      </Switch>
    </Router>
  );
}
