import { BaseType } from '@arco-design/web-vue/es/_utils/types';
import axios from 'axios';
import qs from 'query-string';
import { PageReq, PageRsp } from '@/api/luck/page';

export interface CreditApply {
  id?: string;
  userId: string;
  groupId: string;
  credit: string;
  fromAddress?: string;
  toAddress?: string;
  txnHash?: string;
  remark?: string;
  type?: number;
  status?: number;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface CreditApplyReq {
  id?: string;
  userId: string;
  groupId: string;
  credit: string;
  fromAddress?: string;
  toAddress?: string;
  txnHash?: string;
  remark?: string;
  type?: number;
  status?: number;
}

export async function list(pageReq: PageReq, data?: CreditApplyReq) {
  const mixReq = { ...pageReq, ...data };
  return axios.get<PageRsp<CreditApply>>('/luck/v1/credit_apply/page/logic', {
    params: mixReq,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export async function detail(id: BaseType) {
  return axios.get('/luck/v1/credit_apply?id=' + id);
}

export async function logicDelete(id: BaseType) {
  return axios.delete('/luck/v1/credit_apply/logic?id=' + id);
}
export async function revertLogicDelete(id: BaseType) {
  return axios.put('/luck/v1/credit_apply/logic?id=' + id);
}

export async function logicDeleteList(idList: BaseType[]) {
  return axios.delete(
    '/luck/v1/credit_apply/logic/list?ids=' + idList.join(',')
  );
}

export async function revertLogicDeleteList(idList: BaseType[]) {
  return axios.put('/luck/v1/credit_apply/logic/list?ids=' + idList.join(','));
}

export async function deleteById(id: String) {
  return axios.delete('/luck/v1/credit_apply?id=' + id);
}

export async function deleteListByIds(idList: BaseType[]) {
  return axios.delete('/luck/v1/credit_apply/list?ids=' + idList.join(','));
}

export async function finById(id: BaseType) {
  return axios.get('/luck/v1/credit_apply?id=' + id);
}

export async function addList(data: CreditApplyReq[]) {
  return axios.post('/luck/v1/credit_apply/list', data);
}

export async function add(data: CreditApplyReq) {
  return axios.post('/luck/v1/credit_apply', data);
}

export async function update(id: BaseType, data: CreditApplyReq) {
  return axios.put('/luck/v1/credit_apply?id=' + id, data);
}
