import { BaseType } from '@arco-design/web-vue/es/_utils/types';
import axios from 'axios';
import qs from 'query-string';
import { PageReq, PageRsp } from '@/api/luck/page';

export interface Invite {
  id?: string;
  userId?: string;
  groupId: string;
  url: string;
  urlHash: string;
  remark: string;
  expiredAt: string;
  status: number | undefined;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface InviteReq {
  id?: string;
  userId?: string;
  groupId: string;
  url: string;
  urlHash: string;
  remark: string;
  expiredAt: string;
  status: number | undefined;
}

export async function list(pageReq: PageReq, data?: InviteReq) {
  const mixReq = { ...pageReq, ...data };
  return axios.get<PageRsp<Invite>>('/luck/v1/invite/page/logic', {
    params: mixReq,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export async function detail(id: BaseType) {
  return axios.get('/luck/v1/invite?id=' + id);
}

export async function logicDelete(id: BaseType) {
  return axios.delete('/luck/v1/invite/logic?id=' + id);
}
export async function revertLogicDelete(id: BaseType) {
  return axios.put('/luck/v1/invite/logic?id=' + id);
}

export async function logicDeleteList(idList: BaseType[]) {
  return axios.delete('/luck/v1/invite/logic/list?ids=' + idList.join(','));
}

export async function revertLogicDeleteList(idList: BaseType[]) {
  return axios.put('/luck/v1/invite/logic/list?ids=' + idList.join(','));
}

export async function deleteById(id: String) {
  return axios.delete('/luck/v1/invite?id=' + id);
}

export async function deleteListByIds(idList: BaseType[]) {
  return axios.delete('/luck/v1/invite/list?ids=' + idList.join(','));
}

export async function finById(id: BaseType) {
  return axios.get('/luck/v1/invite?id=' + id);
}

export async function addList(data: InviteReq[]) {
  return axios.post('/luck/v1/invite/list', data);
}

export async function add(data: InviteReq) {
  return axios.post('/luck/v1/invite', data);
}

export async function update(id: BaseType, data: InviteReq) {
  return axios.put('/luck/v1/invite?id=' + id, data);
}
