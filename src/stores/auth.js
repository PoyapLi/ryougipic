import {observable, action} from 'mobx';
import {Auth} from '../models';
import UserStore from './user';
import HistoryStore from './history';
import ImageStore from './image';
import {message} from 'antd';

class AuthStore {
  // 状态
  @observable values = {
    username: '',
    password: ''
  };

  // 行为，用于改变状态
  @action setIsLogin(isLogin) {
    this.isLogin = isLogin;
  }

  @action setUsername(username) {
    this.values.username = username;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then(user => {
          UserStore.pullUser();
          resolve(user);
        }).catch(err => {
          UserStore.resetUser();
          message.error('登录失败')
          reject(err);
      })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          UserStore.pullUser();
          resolve(user);
        }).catch(err => {
          UserStore.resetUser();
          message.error('注册失败')
          reject(err);
      })
    })
  }

  @action logout(){
    Auth.logout();
    UserStore.resetUser();
    HistoryStore.reset();
    ImageStore.reset();
  }
}

export default new AuthStore();