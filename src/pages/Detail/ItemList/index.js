import React from 'react';
import {
  View, Text, Image, TouchableOpacity, Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

const ItemList = ({ issue }) => (
  <TouchableOpacity onPress={() => {
    Linking.openURL(issue.html_url);
  }}>
    <View style={styles.container}>
      <Image source={{ uri: issue.user.avatar_url }} style={styles.avatar} />
      <View style={styles.boxTitle}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{issue.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">{issue.user.login}</Text>
      </View>
      <Icon name="angle-right" size={28} style={styles.icon} />
    </View>
  </TouchableOpacity>
);
ItemList.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default ItemList;
