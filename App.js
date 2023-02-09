import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Manager from './Manager'
import {View, Text, Button,StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

const Home = (props) => {
    const navigation = props.navigation;
    return (<View style = {styles.container}>
        <Text>Phạm Thành Đạo</Text>
        <Button
            title='Thông tin cá nhân'
            onPress={() => navigation.navigate('Manager',{name:'Phạm Thành Đạo'})}
        />
    </View>);
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Manager' component={Manager}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
const styles = StyleSheet.create({
  container :{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  }
})
export default App;
