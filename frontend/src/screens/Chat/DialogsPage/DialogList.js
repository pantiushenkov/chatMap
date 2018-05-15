import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import DialogItem from './DialogItem';
import {cs} from 'src/styles/CommonStyles';


class DialogList extends React.Component {
  handleClick = () => {
    console.log('click');
  };

  render() {
    const {list, editing, dialogItem} = this.props;

    if (!list) return null;

    return (
      <View style={styles.list}>
        {list.map(item => (
          <DialogItem
            key={item._id}
            editing={editing}
            item={item}
            onOpen={this.handleClick}
            dialogItem={dialogItem}
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
