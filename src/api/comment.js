// eslint-disable-next-line no-unused-vars
import request from '@/untils/request'

export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}

export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: {
      target
    }
  })
}

export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}

export const addComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
