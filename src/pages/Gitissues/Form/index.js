import React, { Component, Fragment } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import api from '~/services/api';

export default class Form extends Component {
  static propTypes = {
    repositorios: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })).isRequired,
    setRepo: PropTypes.func.isRequired,
  };

  state = {
    error: false,
    loading: false,
    repo: '',
  };

  saveRepo = async (repo) => {
    const { repositorios } = this.props;
    const arrRepo = [...(repositorios.filter(rp => rp.id !== repo.id)), repo];
    await AsyncStorage.setItem('@Githuber:repo', JSON.stringify({ repositorios: arrRepo }));
    return arrRepo;
  };

  checkRepoExists = async (repo) => {
    const { data } = await api.get(`/repos/${repo}`);
    const { id, name, owner } = data;
    const { login, avatar_url: avatar } = owner;

    return {
      id,
      name,
      login,
      avatar,
    };
  };

  singIn = async () => {
    const { repo } = this.state;
    const { setRepo } = this.props;
    this.setState({
      loading: true,
      error: false,
    });
    try {
      const myRepo = await this.checkRepoExists(repo);
      const repositorios = await this.saveRepo(myRepo);
      this.setState({
        repo: '',
        loading: false,
        error: false,
      });
      setRepo(repositorios);
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
      console.tron.log('erro');
    }
  };

  render() {
    const {
      repo, loading, error,
    } = this.state;
    return (
      <Fragment>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite o Repositorio"
            underlineColorAndroid="transparent"
            value={repo}
            onChangeText={text => this.setState({ repo: text })}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.singIn}
          >
            {loading ? <ActivityIndicator /> : (
              <Text style={styles.buttonText}>
                <Icon
                  name="plus"
                  size={30}
                  style={styles.icon}
                />
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.error}>Repositório não encontrado</Text>}
      </Fragment>
    );
  }
}
