import Main from './Main';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';
const stripeKey =
  'pk_test_51Ok0ddSIHEF0ff5V2AkrdXD6VzYPilzDB5DgTQjHDokJv5OOLhCJsf2LBJXld6dIO5HtjM5dHMVRxnsG0h8qJMOL00fSwY3dpm';

export default function App() {
  return (
    <StripeProvider
      threeDSecureParams={{
        backgroundColor: '#fff',
        timeout: 5,
      }}
      merchantIdentifier="merchant.com.rohitkamble"
      publishableKey={stripeKey}
    >
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  );
}
