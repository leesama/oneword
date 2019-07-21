import { get } from '../util/http'

const getfont = get('font.css')
const getfeeds = get('/yiyan/getfeeds')

export { getfont, getfeeds }
