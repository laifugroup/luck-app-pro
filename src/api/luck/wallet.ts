import { BaseType } from '@arco-design/web-vue/es/_utils/types';
import axios from 'axios';
import qs from 'query-string';
import { PageReq, PageRsp } from '@/api/luck/page';

export interface Wallet {
  id?: string;
  userId?: string;
  credit?: number;
  status: number | undefined;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface WalletReq {
  id?: string;
  userId?: string;
  credit?: number;
  status: number | undefined;
}

export async function list(pageReq: PageReq, data?: WalletReq) {
  const mixReq = { ...pageReq, ...data };
  return axios.get<PageRsp<Wallet>>('/luck/v1/wallet/page/logic', {
    params: mixReq,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export async function detail(id: BaseType) {
  return axios.get('/luck/v1/wallet?id=' + id);
}

export async function logicDelete(id: BaseType) {
  return axios.delete('/luck/v1/wallet/logic?id=' + id);
}
export async function revertLogicDelete(id: BaseType) {
  return axios.put('/luck/v1/wallet/logic?id=' + id);
}

export async function logicDeleteList(idList: BaseType[]) {
  return axios.delete('/luck/v1/wallet/logic/list?ids=' + idList.join(','));
}

export async function revertLogicDeleteList(idList: BaseType[]) {
  return axios.put('/luck/v1/wallet/logic/list?ids=' + idList.join(','));
}

export async function deleteById(id: String) {
  return axios.delete('/luck/v1/wallet?id=' + id);
}

export async function deleteListByIds(idList: BaseType[]) {
  return axios.delete('/luck/v1/wallet/list?ids=' + idList.join(','));
}

export async function finById(id: BaseType) {
  return axios.get('/luck/v1/wallet?id=' + id);
}

export async function addList(data: WalletReq[]) {
  return axios.post('/luck/v1/wallet/list', data);
}

export async function add(data: WalletReq) {
  return axios.post('/luck/v1/wallet', data);
}

export async function update(id: BaseType, data: WalletReq) {
  return axios.put('/luck/v1/wallet?id=' + id, data);
}
