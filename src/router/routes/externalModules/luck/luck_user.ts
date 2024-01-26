import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const LuckUser: AppRouteRecordRaw = {
  path: '/luck/user',
  name: 'LuckUser',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.luck.user',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2,
  },
  children: [
    {
      path: 'luckUserList', // The midline path complies with SEO specifications
      name: 'luckUserList',
      component: () => import('@/views/luck/user/index.vue'),
      meta: {
        locale: 'menu.luck.luckUserList',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'luckUserView', // The midline path complies with SEO specifications
      name: 'luckUserView',
      component: () => import('@/views/luck/user/view.vue'),
      meta: {
        locale: 'menu.luck.luckUserView',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
    {
      path: 'luckUserForm', // The midline path complies with SEO specifications
      name: 'luckUserForm',
      component: () => import('@/views/luck/user/form.vue'),
      meta: {
        locale: 'menu.luck.luckUserForm',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
  ],
};
export default LuckUser;
