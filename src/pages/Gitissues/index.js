import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, SafeAreaView, View, AsyncStorage,
} from 'react-native';
import api from '~/services/api';
import styles from './styles';
import Form from './Form';
import ItemList from './ItemList';

export default class Gitissues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    repositorios: [],
    refreshing: false,
  };

  async componentDidMount() {
    const repo = await AsyncStorage.getItem('@Githuber:repo');
    const repositories = JSON.parse(repo);
    if (repositories != null) this.setState(repositories);
  }

  renderListItem = ({ item }) => <ItemList {...item} />;

  getUpdate = async () => {
    this.setState({ refreshing: true });
    const { repositorios } = this.state;
    const updt = await repositorios.filter(async (rp) => {
      const { data } = await api.get(`/repos/${rp.login}/${rp.name}`);
      const { id, name, owner } = data;
      const { login, avatar_url: avatar } = owner;
      const upd = {
        id,
        name,
        login,
        avatar,
      };
      return upd;
    });
    await AsyncStorage.setItem('@Githuber:repo', JSON.stringify({ repositorios: updt }));
    this.setState({ repositorios: updt, refreshing: false });
  };

  render() {
    const {
      repositorios, refreshing,
    } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Form repositorios={repositorios} setRepo={rep => this.setState({ repositorios: rep })} />
          <FlatList
            style={styles.list}
            data={repositorios}
            keyExtractor={item => String(item.id)}
            renderItem={this.renderListItem}
            onRefresh={this.getUpdate}
            refreshing={refreshing}
          />
        </SafeAreaView>
      </View>
    );
  }
}
