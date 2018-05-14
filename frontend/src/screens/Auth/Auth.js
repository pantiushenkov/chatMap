import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authActions} from "./AuthReducer";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';

import {TextField} from 'react-native-material-textfield';
import {TextButton} from 'react-native-material-buttons';

import {cs} from 'src/styles/CommonStyles';
import {handleChange} from "src/components/Form/HandleChange";
import Error from "src/components/Error";

class Login extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = handleChange.bind(this);

  handleSubmit = (method) => () => {
    const {authActions} = this.props;
    const {data} = this.state;
    authActions[method](data);
  };

  render() {
    const {data} = this.state;
    const {errors} = this.props.authState;

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('src/styles/images/logo.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.formContainer}>
          <TextField
            label='Email'
            baseColor={cs.secondaryRedTextColor}
            textColor={cs.primaryRedTextColor}
            tintColor={cs.primaryRedTextColor}
            keyboardType={'email-address'}
            onChangeText={this.handleChange('email')}
            value={data.email}
            autoCorrect={false}
          />
          <TextField
            label='Password'
            baseColor={cs.secondaryRedTextColor}
            textColor={cs.primaryRedTextColor}
            tintColor={cs.primaryRedTextColor}
            keyboardType={'default'}
            secureTextEntry={true}
            onChangeText={this.handleChange('password')}
            value={data.password}
            error={errors.password}
          />
          <Error message={errors.general}/>
        </View>
        <View style={styles.buttons}>
          <TextButton
            title='LOG IN'
            titleColor={cs.primaryRedTextColor}
            disabledTitleColor={cs.secondaryRedTextColor}
            disabled={!data.email || !data.password}
            onPress={this.handleSubmit('login')}
          />
          <TextButton
            title='REGISTER'
            titleColor={cs.primaryRedTextColor}
            disabledTitleColor={cs.secondaryRedTextColor}
            disabled={!data.email || !data.password}
            onPress={this.handleSubmit('register')}
          />
        </View>
      </View>
    );
  }
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cs.primaryColor,
    padding: 20,
  },
  logoContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: deviceWidth * 0.8,
    height: deviceWidth * 0.8,
  },
  formContainer: {
    flex: 3,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  visibilityIcon: {
    color: cs.primaryRedTextColor,
  },
});

export default connect(
  ({authState}) => ({
    authState
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  })
)(Login);
