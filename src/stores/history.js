import {observable, action} from 'mobx';
import {Uploader} from '../models';
import {message} from 'antd';

class HistoryStore {
  // 状态
  @observable list = [];
  @observable isLoading = false;
  @observable hasMore = true;
  @observable page = 0 ;
  limit = 10;

  // 行为，用于改变状态
  @action append(newList) {
    this.list = this.list.concat(newList);
  }

  @action find(){
    this.isLoading = true;
    Uploader.find({page: this.page, limit: this.limit})
      .then(newList => {
        this.append(newList)
        if(newList.length < this.limit) {
          this.hasMore = false;
        }
      }).catch(error => {
        message.error('加载数据失败')
    }).finally(()=>{
      this.isLoading = false;
    })
  }
}

export default new AuthStore();