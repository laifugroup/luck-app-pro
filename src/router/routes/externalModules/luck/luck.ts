import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const LuckBoom: AppRouteRecordRaw = {
  path: '/luck/service',
  name: 'luckService',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.luck.luck',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2,
  },
  children: [
    {
      path: 'sendLuckList', // The midline path complies with SEO specifications
      name: 'sendLuckList',
      component: () => import('@/views/luck/send_luck/index.vue'),
      meta: {
        locale: 'menu.luck.sendLuckList',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'sendLuckView', // The midline path complies with SEO specifications
      name: 'sendLuckView',
      component: () => import('@/views/luck/send_luck/view.vue'),
      meta: {
        locale: 'menu.luck.sendLuckView',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
    {
      path: 'sendLuckForm', // The midline path complies with SEO specifications
      name: 'sendLuckForm',
      component: () => import('@/views/luck/send_luck/form.vue'),
      meta: {
        locale: 'menu.luck.sendLuckForm',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },

    //goodLuck
    {
      path: 'goodLuckList', // The midline path complies with SEO specifications
      name: 'goodLuckList',
      component: () => import('@/views/luck/good_luck/index.vue'),
      meta: {
        locale: 'menu.luck.goodLuckList',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'goodLuckView', // The midline path complies with SEO specifications
      name: 'goodLuckView',
      component: () => import('@/views/luck/good_luck/view.vue'),
      meta: {
        locale: 'menu.luck.goodLuckView',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
    {
      path: 'goodLuckForm', // The midline path complies with SEO specifications
      name: 'goodLuckForm',
      component: () => import('@/views/luck/good_luck/form.vue'),
      meta: {
        locale: 'menu.luck.goodLuckForm',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
  ],
};
export default LuckBoom;
