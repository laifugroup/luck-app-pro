import { BaseType } from '@arco-design/web-vue/es/_utils/types';
import axios from 'axios';
import qs from 'query-string';
import { PageReq, PageRsp } from '@/api/luck/page';

export interface LuckUser {
  id?: string;
  userName?: string;
  botUserId: string;
  firstName: string;
  lastName: string;
  groupId: string;

  status: number | undefined;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface LuckUserReq {
  id?: string;
  userName?: string;
  botUserId: string;
  firstName: string;
  lastName: string;
  groupId: string;
  status: number | undefined;
}

export async function list(pageReq: PageReq, data?: LuckUserReq) {
  const mixReq = { ...pageReq, ...data };
  return axios.get<PageRsp<LuckUser>>('/luck/v1/user/page/logic', {
    params: mixReq,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export async function detail(id: BaseType) {
  return axios.get('/luck/v1/user?id=' + id);
}

export async function logicDelete(id: BaseType) {
  return axios.delete('/luck/v1/user/logic?id=' + id);
}
export async function revertLogicDelete(id: BaseType) {
  return axios.put('/luck/v1/user/logic?id=' + id);
}

export async function logicDeleteList(idList: BaseType[]) {
  return axios.delete('/luck/v1/user/logic/list?ids=' + idList.join(','));
}

export async function revertLogicDeleteList(idList: BaseType[]) {
  return axios.put('/luck/v1/user/logic/list?ids=' + idList.join(','));
}

export async function deleteById(id: String) {
  return axios.delete('/luck/v1/user?id=' + id);
}

export async function deleteListByIds(idList: BaseType[]) {
  return axios.delete('/luck/v1/user/list?ids=' + idList.join(','));
}

export async function finById(id: BaseType) {
  return axios.get('/luck/v1/user?id=' + id);
}

export async function addList(data: LuckUserReq[]) {
  return axios.post('/luck/v1/user/list', data);
}

export async function add(data: LuckUserReq) {
  return axios.post('/luck/v1/user', data);
}

export async function update(id: BaseType, data: LuckUserReq) {
  return axios.put('/luck/v1/user?id=' + id, data);
}
