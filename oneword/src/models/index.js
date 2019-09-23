import { get } from '../common/js/http'
import { formatFeedData } from '@js/utils.js'
// 该函数用于格式化Card数据
const getformateCard = (url) => (params) => get(url)(params).then(data => formatFeedData(data))
const getFont = get('/font.css')
const getFeeds = getformateCard('/yiyan/getfeeds')
const getCards = getformateCard('/yiyan/crosstime')
const getComments = get('/yiyan/getcommentbycard')
const getAllTextCard = get('/yiyan/getalltextcard')
export { getFont, getCards, getFeeds, getComments, getAllTextCard }
