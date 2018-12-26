import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Login extends Component {
    state = {
        username: "",
        password: ""
    }
    render() {
        return (
            <View>
                <TextInput placeholder='Username' value={this.state.username} 
                    onChangeText={username => this.setState({username})}/>
                <TextInput placeholder='Password' value={this.state.password} 
                    secureTextEntry={true}
                    onChangeText={password => this.setState({password})}/>
                <Button onPress={() => this.props.login(this.state.username, this.state.password)} title={"Login"} />
                <Button onPress={() => this.props.facebookLogin()} title={"Login with Facebook"} />
            </View>
        );
    }
}