export interface PageReq {
    page: number;
    size: number;
    sort: string;
  }
  
  export interface PageRsp<T> {
    current: number;
    total: number;
    size: number;
    records: [T];
  }