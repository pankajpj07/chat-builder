import React from 'react';
import {ChatBuilder} from '@papercups-io/chat-builder';
import Body from './Body';

// NB: during development, replace this with a valid account ID from your dev db
const TEST_ACCOUNT_ID = 'eb504736-0f20-4978-98ff-1a82ae60b266';

const config = {
  title: 'Welcome to Papercups!',
  subtitle: 'Ask us anything in the chat window 😊',
  primaryColor: '#1890ff',
  accountId: TEST_ACCOUNT_ID,
  greeting: 'Hi there! How can I help you?',
  newMessagePlaceholder: 'Start typing...',
  emailInputPlaceholder: 'What is your email address?',
  newMessagesNotificationText: 'View new messages',
  agentAvailableText: 'Agents are online!',
  agentUnavailableText: 'Agents are not available at the moment.',
  customer: {
    name: 'Demo User',
    // Ad hoc metadata
    metadata: {
      page: 'github',
    },
  },
  // NB: we override these values during development -- note that the
  // baseUrl: 'http://localhost:4000',
  baseUrl: 'https://alex-papercups-staging.herokuapp.com',
  requireEmailUpfront: true,
  showAgentAvailability: true,
  hideToggleButton: false,
  defaultIsOpen: false,
  iconVariant: 'filled',
};

const Chat = ({config, state, onSendMessage, scrollToRef}) => {
  const [message, setMessageBody] = React.useState('');

  const handleChangeMessage = (e) => setMessageBody(e.target.value);

  const handleSendMessage = () => {
    onSendMessage({body: message});
    setMessageBody('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div
      className='flex flex-col'
      style={{
        height: 640,
        width: 480,
      }}
    >
      <div className='flex flex-col border rounded-xl flex-1 mb-6 dark:bg-gray-800'>
        <div
          className='pt-4 px-4 mb-4'
          style={{
            flex: 1,
            height: '100%',
            overflow: 'scroll',
          }}
        >
          <Body config={config} state={state} scrollToRef={scrollToRef} />
        </div>

        <div className='px-4 pb-4'>
          <div className='p-2 rounded-xl shadow-md border'>
            <form onSubmit={handleSubmit}>
              <input
                className='bg-transparent outline-none box-border w-full p-2 dark:text-white'
                value={message}
                placeholder='Start typing...'
                onChange={handleChangeMessage}
              />
            </form>
          </div>
        </div>
      </div>

      <div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full w-full focus:outline-none'
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [isDarkMode, setDarkMode] = React.useState(false);

  const handleToggleMode = (e) => {
    setDarkMode(e.target.checked);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : 'light'} p-6`}>
      <ChatBuilder
        config={config}
        version={'v2.0.0'}
        onChatLoaded={() => console.log('Chat loaded!')}
        onChatClosed={() => console.log('Chat closed!')}
        onChatOpened={() => console.log('Chat opened!')}
        onMessageReceived={(message) =>
          console.log('Message received!', message)
        }
        onMessageSent={(message) => console.log('Message sent!', message)}
      >
        {({
          config,
          state,
          onClose,
          onSendMessage,
          onToggleOpen,
          scrollToRef,
        }) => {
          return (
            <Chat
              config={config}
              state={state}
              onClose={onClose}
              onSendMessage={onSendMessage}
              onToggleOpen={onToggleOpen}
              scrollToRef={scrollToRef}
            />
          );
        }}
      </ChatBuilder>

      <div className='mt-10'>
        <label className='inline-flex items-center mt-3'>
          <input
            type='checkbox'
            className='h-5 w-5'
            checked={isDarkMode}
            onChange={handleToggleMode}
          />
          <span className='ml-2 text-gray-700'>Dark mode</span>
        </label>
      </div>
    </div>
  );
};

export default App;