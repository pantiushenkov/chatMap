import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import DialogItem from './DialogItem';
import {cs} from 'src/styles/CommonStyles';


class DialogList extends React.Component {
  render() {
    const {list, editing} = this.props;

    if (!list) return null;

    return (
      <View style={styles.list}>
        {Object.values(list).map(item => (
          <DialogItem
            key={item._id}
            editing={editing}
            item={item}
          />
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: cs.primaryColor,
  }
});

export default DialogList
