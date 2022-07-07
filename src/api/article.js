import request from '@/untils/request'

export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}

/**
 * 添加用户
 * @param {用户id} target
 * @return
 */
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: '/user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消用户
 * @param {用户id} target
 * @returns
 *
 */

export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}

/**
 * 添加收藏
 * @param {用户id} target
 * @returns
 *
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏
 * @param {用户id} target
 * @returns
 *
 */
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
