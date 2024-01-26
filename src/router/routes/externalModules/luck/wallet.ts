import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const Wallet: AppRouteRecordRaw = {
  path: '/luck/wallet',
  name: 'Wallet',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.luck.wallet',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2,
  },
  children: [
    {
      path: 'walletList', // The midline path complies with SEO specifications
      name: 'walletList',
      component: () => import('@/views/luck/wallet/index.vue'),
      meta: {
        locale: 'menu.luck.walletList',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'walletView', // The midline path complies with SEO specifications
      name: 'walletView',
      component: () => import('@/views/luck/wallet/view.vue'),
      meta: {
        locale: 'menu.luck.walletView',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
    {
      path: 'walletForm', // The midline path complies with SEO specifications
      name: 'walletForm',
      component: () => import('@/views/luck/wallet/form.vue'),
      meta: {
        locale: 'menu.luck.walletForm',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },

    //creditLog
    {
      path: 'creditLogList', // The midline path complies with SEO specifications
      name: 'creditLogList',
      component: () => import('@/views/luck/credit_log/index.vue'),
      meta: {
        locale: 'menu.luck.creditLogList',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'creditLogView', // The midline path complies with SEO specifications
      name: 'creditLogView',
      component: () => import('@/views/luck/credit_log/view.vue'),
      meta: {
        locale: 'menu.luck.creditLogView',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
    {
      path: 'creditLogForm', // The midline path complies with SEO specifications
      name: 'creditLogForm',
      component: () => import('@/views/luck/credit_log/form.vue'),
      meta: {
        locale: 'menu.luck.creditLogForm',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },

    //上下分申请
    {
      path: 'creditApplyList', // The midline path complies with SEO specifications
      name: 'creditApplyList',
      component: () => import('@/views/luck/credit_apply/index.vue'),
      meta: {
        locale: 'menu.luck.creditApplyList',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'creditApplyView', // The midline path complies with SEO specifications
      name: 'creditApplyView',
      component: () => import('@/views/luck/credit_apply/view.vue'),
      meta: {
        locale: 'menu.luck.creditApplyView',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
    {
      path: 'creditApplyForm', // The midline path complies with SEO specifications
      name: 'creditApplyForm',
      component: () => import('@/views/luck/credit_apply/form.vue'),
      meta: {
        locale: 'menu.luck.creditApplyForm',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
  ],
};
export default Wallet;
