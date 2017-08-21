import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
  TabBar,
  TabRoute
} from 'react-native-router-redux';
import { authSignout } from './redux/actions';

const defaultSchema = {
  navBar: NavBar,
  navLeftColor: '#FFFFFF',
  navTint: '#224655',
  navTitleColor: '#FFFFFF',
  navTitleStyle: {
    fontSize: 18,
  },
  navRightColor: '#FFFFFF',
  statusStyle: 'light-content',
  tabBar: TabBar
};

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AllConversationsPage from './pages/AllConversationsPage';
import CreateConversationPage from './pages/CreateConversationPage';
import MyConversationsPage from './pages/MyConversationsPage';
import ChatPage from './pages/ChatPage';

export class App extends Component {
  render() {
    const {
      t,
      ...args
    } = this.props;
    const loggedInSchema = Object.assign({}, defaultSchema, {
      navRightTitle: t('topBar.logOut'),
      navRightHandler: this.props.authSignout
    });

    // NOTE: schema is not working very well
    // NOTE: also nav button title does not change once initialized
    return (
      <Router {...args} initial="login">
        <Schema name="default" {...defaultSchema} />
        <Schema name="loggedIn" {...loggedInSchema} />
        <Route name="login" component={LoginPage} type="reset" title={t('pageTitles.signIn')} />
        <Route name="signup" component={SignUpPage} title={t('pageTitles.signUp')} />
        <Route name="chat" component={ChatPage} title="Chat" />
        <TabRoute name="conversationTabs" barTint='#FFFFFF' tint="#32DEAF" schema="loggedIn">
          <Route name="allConversations" component={AllConversationsPage} schema="loggedIn" {...loggedInSchema} title={t('pageTitles.joinConversation')} tabItem={{title: t('tabBar.all')}} />
          <Route name="createConversation" component={CreateConversationPage} {...loggedInSchema} schema="loggedIn" title={t('pageTitles.createConversation')} tabItem={{title: t('tabBar.create')}} />
          <Route name="myConversations" component={MyConversationsPage} schema="loggedIn" {...loggedInSchema} title={t('pageTitles.myConversations')} tabItem={{title: t('tabBar.mine')}} />
        </TabRoute>
      </Router>
    );
  }
}

const mapStateToprops = (state) => ({
  currentUser: state.app.currentUser,
  router: state.router
});

const mapDispatchToProps = (dispatch) => ({
  authSignout: () => dispatch(authSignout()),
  goLogin: () => dispatch({
    type: routerActions.actionTypes.ROUTER_PUSH,
    payload: {
      name: 'login'
    }
  }),
  actions: bindActionCreators({
    ...routerActions,
  }, dispatch),
  dispatch,
});

export default translate()(connect(mapStateToprops, mapDispatchToProps)(App));
