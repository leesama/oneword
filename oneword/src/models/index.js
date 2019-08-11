import { get } from '../common/js/http'

const getfont = get('/font.css')
const getfeeds = get('/yiyan/getfeeds')
export { getfont, getfeeds }
