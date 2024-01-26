import { BaseType } from '@arco-design/web-vue/es/_utils/types';
import axios from 'axios';
import qs from 'query-string';
import { PageReq, PageRsp } from '@/api/luck/page';

export interface SendLuck {
  id?: string;
  userId?: string;
  credit: number;
  redPackNumbers: string;
  boomNumber: string;
  firstName: string;
  lastName: string;
  userName: string;
  groupId: string;
  status: number;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface SendLuckReq {
  id?: string;
  userId?: string;
  credit: number;
  redPackNumbers: string;
  boomNumber: string;
  firstName: string;
  lastName: string;
  userName: string;
  groupId: string;
  status: number;
}

export async function list(pageReq: PageReq, data?: SendLuckReq) {
  const mixReq = { ...pageReq, ...data };
  return axios.get<PageRsp<SendLuck>>('/luck/v1/send_luck/page/logic', {
    params: mixReq,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export async function detail(id: BaseType) {
  return axios.get('/luck/v1/send_luck?id=' + id);
}

export async function logicDelete(id: BaseType) {
  return axios.delete('/luck/v1/send_luck/logic?id=' + id);
}
export async function revertLogicDelete(id: BaseType) {
  return axios.put('/luck/v1/send_luck/logic?id=' + id);
}

export async function logicDeleteList(idList: BaseType[]) {
  return axios.delete('/luck/v1/send_luck/logic/list?ids=' + idList.join(','));
}

export async function revertLogicDeleteList(idList: BaseType[]) {
  return axios.put('/luck/v1/send_luck/logic/list?ids=' + idList.join(','));
}

export async function deleteById(id: String) {
  return axios.delete('/luck/v1/send_luck?id=' + id);
}

export async function deleteListByIds(idList: BaseType[]) {
  return axios.delete('/luck/v1/send_luck/list?ids=' + idList.join(','));
}

export async function finById(id: BaseType) {
  return axios.get('/luck/v1/send_luck?id=' + id);
}

export async function addList(data: SendLuckReq[]) {
  return axios.post('/luck/v1/send_luck/list', data);
}

export async function add(data: SendLuckReq) {
  return axios.post('/luck/v1/send_luck', data);
}

export async function update(id: BaseType, data: SendLuckReq) {
  return axios.put('/luck/v1/send_luck?id=' + id, data);
}
