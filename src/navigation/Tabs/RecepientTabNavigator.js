import RecepientDashboard from "../../screens/Dashboards/RecepientDash";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Profile from "../../screens/Profile";
import BottomNavRecepient from "../../components/BottomNavRecepients";
import RecepientHistory from "../../screens/History/RecepientHistory";
import RecepientNotifications from "../../screens/Notifications/RecepientNotifications";

const Tab = createBottomTabNavigator();

export const RecepientTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="RecepientHomePage"
    tabBar={(props) => <BottomNavRecepient {...props} />}
  >
    <Tab.Screen
      name="RecepientHomePage"
      component={RecepientDashboard}
      options={{icon: "home", headerShown: false}}
    />
    <Tab.Screen
      name="RecepientHistory"
      component={RecepientHistory}
      options={{icon: "home", headerShown: false}}
    />
    <Tab.Screen
      name="RecepientNotifications"
      component={RecepientNotifications}
      options={{icon: "home", headerShown: false}}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{icon: "home", headerShown: false}}
    />
  </Tab.Navigator>
);
