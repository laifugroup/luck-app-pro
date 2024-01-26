import { BaseType } from '@arco-design/web-vue/es/_utils/types';
import axios from 'axios';
import qs from 'query-string';
import { PageReq, PageRsp } from '@/api/luck/page';

export interface InviteLog {
  id?: string;
  userId?: string;
  inviteUrl?: string;
  urlHash?: string;
  groupId?: string;
  inviteeUserId?: string;
  remark?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface InviteLogReq {
  id?: string;
  userId?: string;
  inviteUrl?: string;
  urlHash?: string;
  groupId?: string;
  inviteeUserId?: string;
  remark?: string;
}

export async function list(pageReq: PageReq, data?: InviteLogReq) {
  const mixReq = { ...pageReq, ...data };
  return axios.get<PageRsp<InviteLog>>('/luck/v1/invite_log/page/logic', {
    params: mixReq,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export async function detail(id: BaseType) {
  return axios.get('/luck/v1/invite_log?id=' + id);
}

export async function logicDelete(id: BaseType) {
  return axios.delete('/luck/v1/invite_log/logic?id=' + id);
}
export async function revertLogicDelete(id: BaseType) {
  return axios.put('/luck/v1/invite_log/logic?id=' + id);
}

export async function logicDeleteList(idList: BaseType[]) {
  return axios.delete('/luck/v1/invite_log/logic/list?ids=' + idList.join(','));
}

export async function revertLogicDeleteList(idList: BaseType[]) {
  return axios.put('/luck/v1/invite_log/logic/list?ids=' + idList.join(','));
}

export async function deleteById(id: String) {
  return axios.delete('/luck/v1/invite_log?id=' + id);
}

export async function deleteListByIds(idList: BaseType[]) {
  return axios.delete('/luck/v1/invite_log/list?ids=' + idList.join(','));
}

export async function finById(id: BaseType) {
  return axios.get('/luck/v1/invite_log?id=' + id);
}

export async function addList(data: InviteLogReq[]) {
  return axios.post('/luck/v1/invite_log/list', data);
}

export async function add(data: InviteLogReq) {
  return axios.post('/luck/v1/invite_log', data);
}

export async function update(id: BaseType, data: InviteLogReq) {
  return axios.put('/luck/v1/invite_log?id=' + id, data);
}
