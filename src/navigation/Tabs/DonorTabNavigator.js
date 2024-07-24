import DonorDashboard from "../../screens/Dashboards/DonorDash";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BottomNav from "../../components/BottomNav";
import Profile from "../../screens/Profile";
import DonorNotifications from "../../screens/Notifications/DonorNotifications";
import DonorHistory from "../../screens/History/DonorHistory";

const Tab = createBottomTabNavigator();

export const DonorTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="DonorHomePage"
    tabBar={(props) => <BottomNav {...props} />}
  >
    <Tab.Screen
      name="DonorHomePage"
      component={DonorDashboard}
      options={{icon: "home", headerShown: false}}
    />
    <Tab.Screen
      name="DonorHistory"
      component={DonorHistory}
      options={{icon: "home", headerShown: false}}
    />
    <Tab.Screen
      name="DonorNotifications"
      component={DonorNotifications}
      options={{icon: "home", headerShown: false}}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{icon: "home", headerShown: false}}
    />
  </Tab.Navigator>
);
