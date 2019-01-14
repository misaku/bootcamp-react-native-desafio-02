import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import styles from './styles';

const ItemList = ({
  avatar, name, login, id, navigation,
}) => (
  <TouchableOpacity onPress={() => navigation.navigate('Detail', { detail: { title: name, id } })}>
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.boxTitle}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{login}</Text>
      </View>
      <Icon name="angle-right" size={28} style={styles.icon} />
    </View>
  </TouchableOpacity>
);
ItemList.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default withNavigation(ItemList);
