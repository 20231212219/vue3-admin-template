// mock/acl.ts
import { MockMethod } from 'vite-plugin-mock'

// 模拟的用户数据
const users = [
  {
    id: 1,
    username: 'admin',
    name: '超级管理员',
    roleName: '超级管理员',
    createTime: '2023-01-01 00:00:00',
    updateTime: '2023-01-01 00:00:00',
  },
  {
    id: 2,
    username: 'user1',
    name: '普通用户1',
    roleName: '普通用户',
    createTime: '2023-01-02 00:00:00',
    updateTime: '2023-01-02 00:00:00',
  },
  {
    id: 3,
    username: 'user2',
    name: '普通用户2',
    roleName: '普通用户',
    createTime: '2023-01-03 00:00:00',
    updateTime: '2023-01-03 00:00:00',
  },
  // 生成更多测试数据...
  ...Array.from({ length: 20 }).map((_, index) => ({
    id: index + 4,
    username: `test_user_${index + 1}`,
    name: `测试用户${index + 1}`,
    roleName: index % 2 === 0 ? '普通用户' : '运营人员',
    createTime: '2023-05-20 12:00:00',
    updateTime: '2023-05-20 12:00:00',
  })),
]

// 模拟的角色数据
const roles = [
  {
    id: 1,
    roleName: '超级管理员',
    remark: '拥有所有权限',
    createTime: '2023-01-01 00:00:00',
    updateTime: '2023-01-01 00:00:00',
  },
  {
    id: 2,
    roleName: '普通用户',
    remark: '仅拥有基本权限',
    createTime: '2023-01-02 00:00:00',
    updateTime: '2023-01-02 00:00:00',
  },
  {
    id: 3,
    roleName: '运营人员',
    remark: '拥有运营相关权限',
    createTime: '2023-01-03 00:00:00',
    updateTime: '2023-01-03 00:00:00',
  },
]

// 模拟的菜单权限数据
const permissions = [
  {
    id: 1,
    pid: 0,
    name: '全部数据',
    code: null,
    toCode: null,
    type: 1,
    status: null,
    level: 1,
    children: [
      {
        id: 2,
        pid: 1,
        name: '权限管理',
        code: 'Acl',
        toCode: null,
        type: 1,
        status: null,
        level: 2,
        children: [
          {
            id: 3,
            pid: 2,
            name: '用户管理',
            code: 'User',
            toCode: null,
            type: 1,
            status: null,
            level: 3,
            children: [
              {
                id: 4,
                pid: 3,
                name: '用户添加',
                code: 'btn.User.add',
                toCode: null,
                type: 2,
                status: null,
                level: 4,
                children: [],
                select: false,
              },
              {
                id: 5,
                pid: 3,
                name: '用户删除',
                code: 'btn.User.remove',
                toCode: null,
                type: 2,
                status: null,
                level: 4,
                children: [],
                select: false,
              },
              {
                id: 6,
                pid: 3,
                name: '用户修改',
                code: 'btn.User.update',
                toCode: null,
                type: 2,
                status: null,
                level: 4,
                children: [],
                select: false,
              },
              {
                id: 7,
                pid: 3,
                name: '分配角色',
                code: 'btn.User.assign',
                toCode: null,
                type: 2,
                status: null,
                level: 4,
                children: [],
                select: false,
              },
            ],
            select: false,
          },
          {
            id: 8,
            pid: 2,
            name: '角色管理',
            code: 'Role',
            toCode: null,
            type: 1,
            status: null,
            level: 3,
            children: [
              {
                id: 9,
                pid: 8,
                name: '角色添加',
                code: 'btn.Role.add',
                toCode: null,
                type: 2,
                status: null,
                level: 4,
                children: [],
                select: false,
              },
              {
                id: 10,
                pid: 8,
                name: '角色修改',
                code: 'btn.Role.update',
                toCode: null,
                type: 2,
                status: null,
                level: 4,
                children: [],
                select: false,
              },
              {
                id: 11,
                pid: 8,
                name: '角色删除',
                code: 'btn.Role.remove',
                toCode: null,
                type: 2,
                status: null,
                level: 4,
                children: [],
                select: false,
              },
              {
                id: 12,
                pid: 8,
                name: '分配权限',
                code: 'btn.Role.assign',
                toCode: null,
                type: 2,
                status: null,
                level: 4,
                children: [],
                select: false,
              },
            ],
            select: false,
          },
          {
            id: 13,
            pid: 2,
            name: '菜单管理',
            code: 'Permission',
            toCode: null,
            type: 1,
            status: null,
            level: 3,
            children: [
              {
                id: 14,
                pid: 13,
                name: '菜单添加',
                code: 'btn.Permission.add',
                toCode: null,
                type: 2,
                status: null,
                level: 4,
                children: [],
                select: false,
              },
              {
                id: 15,
                pid: 13,
                name: '菜单修改',
                code: 'btn.Permission.update',
                toCode: null,
                type: 2,
                status: null,
                level: 4,
                children: [],
                select: false,
              },
              {
                id: 16,
                pid: 13,
                name: '菜单删除',
                code: 'btn.Permission.remove',
                toCode: null,
                type: 2,
                status: null,
                level: 4,
                children: [],
                select: false,
              },
            ],
            select: false,
          },
        ],
        select: false,
      },
    ],
    select: false,
  },
]

export default [
  // 用户管理相关接口
  {
    url: '/admin/acl/user/:page/:limit',
    method: 'get',
    response: ({ url, query, params }) => {
      const { page, limit } = params || {}
      const { username } = query
      let mockList = users
      if (username) {
        mockList = mockList.filter((item) => item.username.includes(username))
      }
      const p = page || 1
      const l = limit || 10
      const pageList = mockList.filter((item, index) => index < l * p && index >= l * (p - 1))
      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          total: mockList.length,
          records: pageList,
          size: l,
          current: p,
          pages: Math.ceil(mockList.length / l),
        },
      }
    },
  },
  {
    url: '/admin/acl/user/save',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        message: '添加成功',
        ok: true,
        data: null,
      }
    },
  },
  {
    url: '/admin/acl/user/update',
    method: 'put',
    response: ({ body }) => {
      return {
        code: 200,
        message: '修改成功',
        ok: true,
        data: null,
      }
    },
  },
  {
    url: '/admin/acl/user/toAssign/:userId',
    method: 'get',
    response: ({ params }) => {
      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          assignRoles: [roles[0]], // 默认分配第一个角色
          allRolesList: roles,
        },
      }
    },
  },
  {
    url: '/admin/acl/user/doAssignRole',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        message: '分配角色成功',
        ok: true,
        data: null,
      }
    },
  },
  {
    url: '/admin/acl/user/remove/:id',
    method: 'delete',
    response: ({ params }) => {
      return {
        code: 200,
        message: '删除成功',
        ok: true,
        data: null,
      }
    },
  },
  {
    url: '/admin/acl/user/batchRemove',
    method: 'delete',
    response: ({ body }) => {
      return {
        code: 200,
        message: '批量删除成功',
        ok: true,
        data: null,
      }
    },
  },

  // 角色管理相关接口
  {
    url: '/admin/acl/role/:page/:limit',
    method: 'get',
    response: ({ url, query, params }) => {
      const { page, limit } = params || {}
      const { roleName } = query
      let mockList = roles
      if (roleName) {
        mockList = mockList.filter((item) => item.roleName.includes(roleName))
      }
      const p = page || 1
      const l = limit || 10
      const pageList = mockList.filter((item, index) => index < l * p && index >= l * (p - 1))
      return {
        code: 200,
        message: '成功',
        ok: true,
        data: {
          total: mockList.length,
          records: pageList,
          size: l,
          current: p,
          pages: Math.ceil(mockList.length / l),
        },
      }
    },
  },
  {
    url: '/admin/acl/role/save',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        message: '添加成功',
        ok: true,
        data: null,
      }
    },
  },
  {
    url: '/admin/acl/role/update',
    method: 'put',
    response: ({ body }) => {
      return {
        code: 200,
        message: '修改成功',
        ok: true,
        data: null,
      }
    },
  },
  {
    url: '/admin/acl/role/remove/:id',
    method: 'delete',
    response: ({ params }) => {
      return {
        code: 200,
        message: '删除成功',
        ok: true,
        data: null,
      }
    },
  },
  {
    url: '/admin/acl/permission/toAssign/:roleId',
    method: 'get',
    response: ({ params }) => {
      return {
        code: 200,
        message: '成功',
        ok: true,
        data: permissions,
      }
    },
  },
  {
    url: '/admin/acl/permission/doAssign',
    method: 'post',
    response: ({ query }) => {
      return {
        code: 200,
        message: '分配权限成功',
        ok: true,
        data: null,
      }
    },
  },

  // 菜单管理相关接口
  {
    url: '/admin/acl/permission',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        ok: true,
        data: permissions,
      }
    },
  },
  {
    url: '/admin/acl/permission/save',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 200,
        message: '添加成功',
        ok: true,
        data: null,
      }
    },
  },
  {
    url: '/admin/acl/permission/update',
    method: 'put',
    response: ({ body }) => {
      return {
        code: 200,
        message: '修改成功',
        ok: true,
        data: null,
      }
    },
  },
  {
    url: '/admin/acl/permission/remove/:id',
    method: 'delete',
    response: ({ params }) => {
      return {
        code: 200,
        message: '删除成功',
        ok: true,
        data: null,
      }
    },
  },
] as MockMethod[]
