<template>
  <p class="from">{{fromp}}</p>
</template>

<script>
export default {
  name: 'card-base-from',
  props: {
    from: {
      type: String
    }
  },
  computed: {
    fromp () {
      return this.from ? `- ${this.from} -` : ''
    }
  }
}
</script>
<style lang='stylus' scoped>
.from
  padding-top 50px
  font-size 41px
  text-align center
  ellipsis()
</style>
