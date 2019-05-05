<template>
  <div class="wrapper">
    <div class="field">
      <div class="control has-icons-left ">
        <input
          v-model="query"
          class="input"
          type="text"
          placeholder="ライバー名で検索(ひらがなも可)"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-search" />
        </span>
      </div>
    </div>
    <div class="liver-list">
      <div
        v-for="liver in filteredLivers"
        :key="liver.name"
        class="box liver-card"
      >
        <img
          class="avatar"
          :src="liver.avatarURL"
          alt="アバター画像"
        >
        <span class="has-text-centered has-text-weight-bold is-7">
          {{ liver.name }}
        </span>
        <a
          class="button is-fullwidth"
          :class="{'is-danger': value.includes(liver)}"
          @click="toggle(liver)"
        >
          <span class="icon is-small">
            <i class="fas fa-check" />
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    livers: {
      type: Array,
      defalut: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      query: ''
    }
  },
  computed: {
    filteredLivers() {
      if (!this.query) {
        return this.livers
      }

      return this.livers.filter(liver => {
        return liver.name.includes(this.query) || liver.furigana.includes(this.query)
      })
    },
  },
  methods: {
    toggle(liver) {
      const index = this.value.indexOf(liver)
      if (index === -1) {
        const newSelected = [...this.value, liver]
        this.$emit('input', newSelected)
      } else {
        const newSelected = this.value.filter((item, i) => i !== index)
        this.$emit('input', newSelected)
      }
    },
  }
}
</script>

<style scoped>
.liver-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.liver-card {
  margin: 5px 10px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  padding: 10px;
}

.avatar {
}
</style>
