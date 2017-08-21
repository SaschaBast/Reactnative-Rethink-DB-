import watch from 'redux-watch';

import ConversationMessages from './subscribers/ConversationMessages';
import UserConversations from './subscribers/UserConversations';
import { receiveUserConversations, receiveConversationMessages } from './redux/actions';

const watcherArray = {};

const unsubscribe = (key) => {
  if (!watcherArray[key]) {
    console.warn(`watcher for ${key} does not exist!`);
    return false;
  }

  watcherArray[key].unsubscribe();
  delete watcherArray[key];
  return true;
};

export const createWatchers = (store: State) => {
  const watchConversations = (response: SubscriberResultType) => {
    const {
      action,
      data
    } = response;
    switch (action) {
      case 'get':
      case 'insert':
        // create subscriber in this case
        data.forEach((item) => {
          watcherArray[item.conversation.id] = new ConversationMessages({ id: item.conversation.id}, (messageConversations: Array<any>) => {
            store.dispatch(receiveConversationMessages({
              convId: item.conversation.id,
              messages: messageConversations
            }));
          });
        });
        break;
      case 'delete':
        // unsubscribe
        data.forEach((item) => {
          unsubscribe(item.convId);
        });
        break;
      case 'update':
      default:
        break;
    }
  };

  // subscribe/unsubscribe UserConversations
  const w = watch(store.getState, 'app.currentUser.id');
  store.subscribe(w((newVal, oldVal, objectPath) => {
    if (newVal) {
      watcherArray[newVal] = new UserConversations({ id: newVal }, (userConversations: Array<any>) => {
        store.dispatch(receiveUserConversations(userConversations));
      }, watchConversations);
    } else {
      unsubscribe(oldVal);
    }
  }));

};

export const cleanWatchers = () => {
  for (let key in watcherArray) {
    unsubscribe(key);
  }
};
