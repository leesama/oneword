import { get, post } from '../common/js/http'
import { formatCardData } from '@js/utils.js'
// 该函数用于格式化Card数据
const getformateCard = url => params =>
  post(url)(params).then(data => formatCardData(data.textcardlist))
const getFeeds = post('yiyan/getfeeds')
const getCards = getformateCard('yiyan/crosstime')
const getComments = post('yiyan/getcommentbycard')
const getAllTextCard = post('yiyan/getalltextcard')
const getHotTextCard = post('yiyan/gethottextcard')
const getOriginTextCard = post('yiyan/getorigintextcard')
const getWordTextCard = post('yiyan/getwordtextcard')
const getPoemTextCard = post('yiyan/getpoemtextcard')
const getMovieTextCard = post('yiyan/getmovietextcard')
const getQuotationTextCard = post('yiyan/getquotationtextcard')
const getLyricTextCard = post('yiyan/getlyrictextcard')
const getUserinfoAndBooklist = get('yiyan/getuserinfoandbooklist')
const signUp = post('yiyan/signup')
const signIn = post('yiyan/signin')
const exit = get('yiyan/exit')
const updateUserInfo = post('yiyan/updateuserinfo')
const newBook = post('yiyan/newbook')
const newCard = post('yiyan/newcard')
const newComment = post('yiyan/newcomment')
const deleteComment = post('yiyan/deletecomment')
const newLike = post('yiyan/newlike')
const cancelLike = post('yiyan/cancellike')
const likeComment = post('yiyan/likecomment')
const cancelLikeComment = post('yiyan/cancellikecomment')
export {
  getCards,
  getFeeds,
  getComments,
  getHotTextCard,
  getAllTextCard,
  getUserinfoAndBooklist,
  getOriginTextCard,
  getWordTextCard,
  getPoemTextCard,
  getMovieTextCard,
  getQuotationTextCard,
  getLyricTextCard,
  signUp,
  signIn,
  exit,
  updateUserInfo,
  newBook,
  newCard,
  newComment,
  newLike,
  cancelLike,
  deleteComment,
  likeComment,
  cancelLikeComment
}
