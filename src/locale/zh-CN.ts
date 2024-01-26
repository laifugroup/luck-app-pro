import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

import localeMonitor from '@/views/dashboard/monitor/locale/zh-CN';

import localeSearchTable from '@/views/list/search-table/locale/zh-CN';
import localeCardList from '@/views/list/card/locale/zh-CN';

import localeStepForm from '@/views/form/step/locale/zh-CN';
import localeGroupForm from '@/views/form/group/locale/zh-CN';

import localeBasicProfile from '@/views/profile/basic/locale/zh-CN';

import localeDataAnalysis from '@/views/visualization/data-analysis/locale/zh-CN';
import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/zh-CN';

import localeSuccess from '@/views/result/success/locale/zh-CN';
import localeError from '@/views/result/error/locale/zh-CN';

import locale403 from '@/views/exception/403/locale/zh-CN';
import locale404 from '@/views/exception/404/locale/zh-CN';
import locale500 from '@/views/exception/500/locale/zh-CN';

import localeUserInfo from '@/views/user/info/locale/zh-CN';
import localeUserSetting from '@/views/user/setting/locale/zh-CN';

import localeSettings from './zh-CN/settings';

import localeLuckUser from '@/views/luck/user/locale/zh-CN';
import localeWallet from '@/views/luck/wallet/locale/zh-CN';
import localeCreditLog from '@/views/luck/credit_log/locale/zh-CN';
import localeInvite from '@/views/luck/invite/locale/zh-CN';
import localeInviteLog from '@/views/luck/invite_log/locale/zh-CN';
import localeSendLuck from '@/views/luck/send_luck/locale/zh-CN';
import localeGoodLuck from '@/views/luck/good_luck/locale/zh-CN';
import localeCreditApply from '@/views/luck/credit_apply/locale/zh-CN';

export default {
  ...localeLuckUser,
  ...localeWallet,
  ...localeCreditLog,
  ...localeInvite,
  ...localeInviteLog,
  ...localeSendLuck,
  ...localeGoodLuck,
  ...localeCreditApply,

  'menu.dashboard': '仪表盘',

  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据分析',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'AI Code',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',

  //时间详情
  'default.form.at': '时间详情',
  'default.form.createdAt': '创建时间',
  'default.form.updatedAt': '更新时间',
  'default.form.deletedAt': '删除时间',

  'default.form.search': '查询',
  'default.form.reset': '重置',
  'default.form.deleteSelection': '删除选中行',
  'default.form.selectDefault': '全部',
  'default.operation.create': '新建',
  'default.operation.import': '批量导入',
  'default.operation.download': '下载',
  'default.operation.delete': '彻底删除',
  'default.operation.logicDelete': '逻辑删除',
  'default.operation.recoveryLogicDelete': '恢复删除',
  'default.exportIn.success': '导入成功',
  // actions
  'default.actions.refresh': '刷新',
  'default.actions.density': '密度',
  'default.actions.columnSetting': '列设置',
  'default.action.delete.list': '确认批量删除?',
  'default.action.delete': ' 确定彻底删除数据?',
  'default.action.delete.logic': ' 确定逻辑删除?',
  'default.action.delete.logic.recovery': ' 确定恢复逻辑删除数据?',

  'default.action.delete.success': '删除成功',
  'default.action.delete.logic.success': '逻辑删除成功',
  'default.action.delete.recovery.success': '恢复成功',

  // columns
  'default.form.id': 'ID',
  'default.form.id.placeholder': '请输入ID',
  'default.columns.index': '#',
  'default.columns.createdAt': '创建时间',
  'default.columns.updatedAt': '更新时间',
  'default.columns.deletedAt': '删除时间',
  'default.columns.operations': '操作',
  'default.columns.operations.view': '查看',
  'default.columns.operations.form': '编辑',

  'default.title.description': '其他',
  'default.submit': '提交',
  'default.reset': '重置',
  'default.result.title': '提交成功',
  'default.import.success': '导入成功',

  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,

  ...localeMonitor,
  ...localeSearchTable,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeUserSetting,
};
