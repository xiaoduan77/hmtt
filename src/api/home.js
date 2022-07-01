/* eslint-disable camelcase */
import request from '@/untils/request'

export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}

export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}

export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}
export const saveChannles = (channels) => {
  return request({
    url: '/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
