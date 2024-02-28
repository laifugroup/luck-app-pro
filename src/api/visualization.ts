import axios from 'axios';
import { GeneralChart } from '@/types/global';

export interface ChartDataRecord {
  x: string;
  y: number;
  name: string;
}
export interface DataChainGrowth {
  quota: string;
}

export interface DataChainGrowthRes {
  count: number;
  growth: number;
  chartData: {
    xAxis: string[];
    data: { name: string; value: number[] };
  };
}
export function queryDataChainGrowth(data: DataChainGrowth) {
  return axios.post<DataChainGrowthRes>('/luck/v1/dashboard/api/data-chain-growth', data);
}

export interface PopularAuthorRes {
  list: {
    ranking: number;
    author: string;
    contentCount: number;
    clickCount: number;
  }[];
}

export function queryPopularAuthor() {
  return axios.get<PopularAuthorRes>('/luck/v1/dataAnalysis/api/popular-author/list');
}

export interface ContentPublishRecord {
  x: string[];
  y: number[];
  name: string;
}

export function queryContentPublish() {
  return axios.get<ContentPublishRecord[]>('/luck/v1/dataAnalysis/api/content-publish');
}

export function queryContentPeriodAnalysis() {
  return axios.post<GeneralChart>('/luck/v1/dataAnalysis/api/content-period-analysis');
}

export interface PublicOpinionAnalysis {
  quota: string;
}
export interface PublicOpinionAnalysisRes {
  count: number;
  growth: number;
  chartData: ChartDataRecord[];
}
export function queryPublicOpinionAnalysis(data: DataChainGrowth) {
  return axios.post<PublicOpinionAnalysisRes>(
    '/luck/v1/dataAnalysis/api/public-opinion-analysis',
    data
  );
}
export interface DataOverviewRes {
  xAxis: string[];
  data: Array<{ name: string; value: number[]; count: number }>;
}

export function queryDataOverview() {
  return axios.post<DataOverviewRes>('/api/data-overview');
}
