// export default {
//   created: function () {
//     this.hello()
//   },
//   methods: {
//     hello: function () {
//       console.log('hello from mixin!')
//     }
//   }
// }
const cardContentProps = {
  props: {
    content: {
      type: String
    },
    title: {
      type: String
    },
    isCenter: {
      type: Boolean
    },
    hasImg: { type: String },
    from: { type: String },
    isRadius: { type: Boolean }
  }
}
export { cardContentProps }
