import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import DonationPackStart from "../../screens/DonationPack/DonationPackStart";
import DonationPackCards from "../../screens/DonationPack/DonationPackCards";
import BottomNavDonations from "../../components/BottomNavDonations";

const Tab = createBottomTabNavigator();

export const DonationPageNavigator = () => (
  <Tab.Navigator
    initialRouteName="NewDonation"
    tabBar={(props) => <BottomNavDonations {...props} />}
  >
    <Tab.Screen
      name="NewDonation"
      component={DonationPackStart}
      options={{icon: "home", headerShown: false}}
    />
    <Tab.Screen
      name="DonationPackCards"
      component={DonationPackCards}
      options={{icon: "home"}}
    />
  </Tab.Navigator>
);
