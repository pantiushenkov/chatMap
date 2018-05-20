import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {chatActions} from "../Chat/ChatReducer";
import {getChatName} from "../../services/getChatName";

const intials = {latitudeDelta: 0.055102984377889186, longitudeDelta: 0.05493163793704525}

class Map extends React.Component {
  state = {
    markers: null, region: null
  }

  componentDidMount() {
    this.setRegions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setRegions(nextProps);
  }

  getCurrentChat = (props) => {
    const {chats, navigation} = props;
    const {chatName} = navigation.state.params;
    const chatNames = Object.keys(chats);
    return chats[chatNames.filter(a => getChatName(chats[a]) === chatName)];
  }

  setRegions = (props) => {
    const chat = this.getCurrentChat(props);
    const users = chat.users;
    const usersNames = Object.keys(users);
    const regions = usersNames.map(a => users[a].state.geolocation);

    const data = usersNames.map((a, i) => ({latitude: regions[i].lat, longitude: regions[i].lon, key: a}))
    this.setState({
      region: {...intials, ...data[0]},
      markers: data
    })
  }

  onRegionChange = (region) => {
    this.setState({region});
  }

  render() {
    // console.log(navigation.state.params)
    const {markers, region} = this.state;

    if (!markers) return null;

    return (
      <View style={styles.container}>
        <MapView
          zoomEnabled
          style={styles.map}
          region={region}
          onRegionChange={this.onRegionChange}
        >
          {markers.map(({key, ...coordinate}) => (
            <Marker
              title={key}
              key={key}
              coordinate={coordinate}
              pinColor={'red'}
            />
          ))}
        </MapView>
      </View>
    );
  }
}


export default connect(
  ({chatState}) => ({
    chats: chatState.chats,
  }),
  (dispatch) => ({
    chatActions: bindActionCreators(chatActions, dispatch),
  })
)(Map);


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
