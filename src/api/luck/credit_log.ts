import { BaseType } from '@arco-design/web-vue/es/_utils/types';
import axios from 'axios';
import qs from 'query-string';
import { PageReq, PageRsp } from '@/api/luck/page';

export interface CreditLog {
  id?: string;
  userId?: string;
  creditBefore?: string;
  credit?: string;
  creditAfter?: string;
  type?: number;
  remark?: string;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface CreditLogReq {
  id?: string;
  userId?: string;
  creditBefore?: string;
  credit?: string;
  creditAfter?: string;
  type?: number;
  remark?: string;
}

export async function list(pageReq: PageReq, data?: CreditLogReq) {
  const mixReq = { ...pageReq, ...data };
  return axios.get<PageRsp<CreditLog>>('/luck/v1/credit_log/page/logic', {
    params: mixReq,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export async function detail(id: BaseType) {
  return axios.get('/luck/v1/credit_log?id=' + id);
}

export async function logicDelete(id: BaseType) {
  return axios.delete('/luck/v1/credit_log/logic?id=' + id);
}
export async function revertLogicDelete(id: BaseType) {
  return axios.put('/luck/v1/credit_log/logic?id=' + id);
}

export async function logicDeleteList(idList: BaseType[]) {
  return axios.delete('/luck/v1/credit_log/logic/list?ids=' + idList.join(','));
}

export async function revertLogicDeleteList(idList: BaseType[]) {
  return axios.put('/luck/v1/credit_log/logic/list?ids=' + idList.join(','));
}

export async function deleteById(id: String) {
  return axios.delete('/luck/v1/credit_log?id=' + id);
}

export async function deleteListByIds(idList: BaseType[]) {
  return axios.delete('/luck/v1/credit_log/list?ids=' + idList.join(','));
}

export async function finById(id: BaseType) {
  return axios.get('/luck/v1/credit_log?id=' + id);
}

export async function addList(data: CreditLogReq[]) {
  return axios.post('/luck/v1/credit_log/list', data);
}

export async function add(data: CreditLogReq) {
  return axios.post('/luck/v1/credit_log', data);
}

export async function update(id: BaseType, data: CreditLogReq) {
  return axios.put('/luck/v1/credit_log?id=' + id, data);
}
