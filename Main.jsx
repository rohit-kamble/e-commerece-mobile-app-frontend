import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ProductDetails from './components/ProductDetails';
const Stack = createNativeStackNavigator();
import Toast from 'react-native-toast-message';
import Cart from './screens/Cart';
import ConfirmOrder from './screens/ConfirmOrder';
import Payment from './screens/Payment';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import Verify from './screens/Verify';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import UpdateProfile from './screens/UpdateProfile';
import ChanghePassword from './screens/ChanghePassword';
import Orders from './screens/Orders';
import AdminDashboard from './screens/Admin/AdminDashboard';
import Categories from './screens/Admin/Categories';
import AdminOrder from './screens/Admin/AdminOrder';
import UpdateProduct from './screens/Admin/UpdateProduct';
import NewProduct from './screens/Admin/NewProduct';
import Productimage from './screens/Admin/ProductIamge';
import CamerView from './screens/CameraView';

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="productdetails" component={ProductDetails} />
          <Stack.Screen name="cart" component={Cart} />
          <Stack.Screen name="Confirmorder" component={ConfirmOrder} />
          <Stack.Screen name="payment" component={Payment} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="forgotpassword" component={ForgotPassword} />
          <Stack.Screen name="verify" component={Verify} />
          <Stack.Screen name="signup" component={SignUp} />
          <Stack.Screen name="updateprofile" component={UpdateProfile} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="changepassword" component={ChanghePassword} />
          <Stack.Screen name="orders" component={Orders} />
          <Stack.Screen name="camera" component={CamerView} />

          {/* Admin Routes */}
          <Stack.Screen name="adminpannel" component={AdminDashboard} />
          <Stack.Screen name="categories" component={Categories} />
          <Stack.Screen name="adminorder" component={AdminOrder} />
          <Stack.Screen name="updateproduct" component={UpdateProduct} />
          <Stack.Screen name="newproduct" component={NewProduct} />
          <Stack.Screen name="productimages" component={Productimage} />
        </Stack.Group>
      </Stack.Navigator>
      <Toast position="top" />
    </NavigationContainer>
  );
}
