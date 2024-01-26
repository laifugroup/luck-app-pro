import { BaseType } from '@arco-design/web-vue/es/_utils/types';
import axios from 'axios';
import qs from 'query-string';
import { PageReq, PageRsp } from '@/api/luck/page';

export interface GoodLuck {
  id?: string;
  betRedPackId?: string;
  sendRedPackUserId: string;
  userId: string;
  groupId: string;
  firstName: string;
  lastName: string;
  userName: string;
  credit: number;
  numbers?: string;
  lastNumber?: string;
  boomNumber?: string;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface GoodLuckReq {
  id?: string;
  betRedPackId?: string;
  sendRedPackUserId: string;
  groupId: string;
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  credit: number;
  numbers?: string;
  lastNumber?: string;
  boomNumber?: string;
}

export async function list(pageReq: PageReq, data?: GoodLuckReq) {
  const mixReq = { ...pageReq, ...data };
  return axios.get<PageRsp<GoodLuck>>('/luck/v1/good_luck/page/logic', {
    params: mixReq,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export async function detail(id: BaseType) {
  return axios.get('/luck/v1/good_luckuser?id=' + id);
}

export async function logicDelete(id: BaseType) {
  return axios.delete('/luck/v1/good_luck/logic?id=' + id);
}
export async function revertLogicDelete(id: BaseType) {
  return axios.put('/luck/v1/good_luck/logic?id=' + id);
}

export async function logicDeleteList(idList: BaseType[]) {
  return axios.delete('/luck/v1/good_luck/logic/list?ids=' + idList.join(','));
}

export async function revertLogicDeleteList(idList: BaseType[]) {
  return axios.put('/luck/v1/good_luck/logic/list?ids=' + idList.join(','));
}

export async function deleteById(id: String) {
  return axios.delete('/luck/v1/good_luck?id=' + id);
}

export async function deleteListByIds(idList: BaseType[]) {
  return axios.delete('/luck/v1/good_luck/list?ids=' + idList.join(','));
}

export async function finById(id: BaseType) {
  return axios.get('/luck/v1/good_luck?id=' + id);
}

export async function addList(data: GoodLuckReq[]) {
  return axios.post('/luck/v1/good_luck/list', data);
}

export async function add(data: GoodLuckReq) {
  return axios.post('/luck/v1/good_luck', data);
}

export async function update(id: BaseType, data: GoodLuckReq) {
  return axios.put('/luck/v1/good_luck?id=' + id, data);
}
