import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const Invite: AppRouteRecordRaw = {
  path: '/invite',
  name: 'invite',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.luck.invite',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2,
  },
  children: [
    {
      path: 'inviteList', // The midline path complies with SEO specifications
      name: 'inviteList',
      component: () => import('@/views/luck/invite/index.vue'),
      meta: {
        locale: 'menu.luck.inviteList',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'inviteView', // The midline path complies with SEO specifications
      name: 'inviteView',
      component: () => import('@/views/luck/invite/view.vue'),
      meta: {
        locale: 'menu.luck.inviteView',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
    {
      path: 'inviteForm', // The midline path complies with SEO specifications
      name: 'inviteForm',
      component: () => import('@/views/luck/invite/form.vue'),
      meta: {
        locale: 'menu.luck.inviteForm',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },

    //角色服务
    {
      path: 'inviteLogList', // The midline path complies with SEO specifications
      name: 'inviteLogList',
      component: () => import('@/views/luck/invite_log/index.vue'),
      meta: {
        locale: 'menu.luck.inviteLogList',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'inviteLogView', // The midline path complies with SEO specifications
      name: 'inviteLogView',
      component: () => import('@/views/luck/invite_log/view.vue'),
      meta: {
        locale: 'menu.luck.inviteLogView',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
    {
      path: 'inviteLogForm', // The midline path complies with SEO specifications
      name: 'inviteLogForm',
      component: () => import('@/views/luck/invite_log/form.vue'),
      meta: {
        locale: 'menu.luck.inviteLogForm',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
  ],
};
export default Invite;
