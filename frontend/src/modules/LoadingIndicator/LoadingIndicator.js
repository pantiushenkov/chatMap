import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

class LoadingIndicator extends Component {
  render() {
    const {target, loadingIndicatorState} = this.props;


    const isVisible = loadingIndicatorState[target];
    console.log('target', target);
    console.log('isVisible', isVisible);
    return isVisible ? (
      <View style={styles.container}>
        <ActivityIndicator style={styles.centered}/>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default connect(
  ({loadingIndicatorState}) => ({
    loadingIndicatorState
  }),
)(LoadingIndicator);

