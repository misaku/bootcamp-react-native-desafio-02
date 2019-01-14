import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, SafeAreaView, View, ActivityIndicator, Text, TouchableOpacity,
} from 'react-native';
import api from '~/services/api';
import styles from './styles';
import ItemList from './ItemList';

export default class Detail extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          detail: PropTypes.shape({
            title: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    idxAll: 1,
    idxOpen: 1,
    idxClose: 1,
    all: [],
    opened: [],
    closed: [],
    type: 1,
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    await this.getUpdates();
  }

  renderListItem = ({ item }) => <ItemList issue={item} />;

  getUpdates = async () => {
    const { navigation } = this.props;
    const {
      type, idxAll, idxOpen, idxClose,
      all, opened, closed,
    } = this.state;
    let st;
    if (type === 1) {
      st = { st: 'all', idx: idxAll };
    } else if (type === 2) {
      st = { st: 'open', idx: idxOpen };
    } else {
      st = { st: 'closed', idx: idxClose };
    }
    const { detail } = navigation.state.params;
    const { data } = await api.get(`/repositories/${detail.id}/issues?state=${st.st}&per_page=25&page=${st.idx}`);
    let myData;
    if (type === 1) {
      myData = [...all, ...data];
    } else if (type === 2) {
      myData = [...opened, ...data];
    } else {
      myData = [...closed, ...data];
    }
    this.setState({
      idxAll: (type === 1 ? idxAll + 1 : idxAll),
      idxOpen: (type === 2 ? idxOpen + 1 : idxOpen),
      idxClose: (type === 3 ? idxClose + 1 : idxClose),
      all: (type === 1 ? myData : all),
      opened: (type === 2 ? myData : opened),
      closed: (type === 3 ? myData : closed),
      issues: myData,
      loading: false,
    });
  };

  getUpdate = async () => {
    this.setState({ loading: true });
    await this.getUpdates();
  };

  renderFooter = () => {
    const { loading } = this.state;
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  render() {
    const {
      issues,
      type,
    } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.filter}>
            <TouchableOpacity onPress={async () => {
              const { all } = this.state;
              await this.setState({ type: 1, issues: all });
              if (all.length === 0) await this.getUpdate();
            }}
            >
              <Text style={[styles.ftText, (type === 1 ? styles.active : null)]}>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
              const { opened } = this.state;
              await this.setState({ type: 2, issues: opened });
              if (opened.length === 0) await this.getUpdate();
            }}
            >
              <Text style={[styles.ftText, (type === 2 ? styles.active : null)]}>Abertos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
              const { closed } = this.state;
              await this.setState({ type: 3, issues: closed });
              if (closed.length === 0) await this.getUpdate();
            }}
            >
              <Text style={[styles.ftText, (type === 3 ? styles.active : null)]}>Fechados</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.list}
            data={issues}
            keyExtractor={item => String(item.id)}
            renderItem={this.renderListItem}
            onEndReached={this.getUpdate}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
          />
        </SafeAreaView>
      </View>
    );
  }
}
