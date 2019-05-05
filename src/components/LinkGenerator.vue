<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-7">
          <p class="title is-5">
            ライバーを選択
          </p>
          <liver-select
            v-model="selectedLivers"
            :livers="livers"
          />
        </div>
        <div class="column is-5 result-box">
          <div class="field">
            <a
              class="button is-primary"
              @click="copyResult"
            >
              <span class="icon">
                <i class="fas fa-copy" />
              </span>
              <span>コピー</span>
            </a>
          </div>
          <textarea
            ref="result"
            class="textarea is-size-7"
            placeholder="結果がここに表示されます"
            rows="20"
            :value="generatedText"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LiverSelect from '@/components/LiverSelect'
import liverData from '@/assets/livers.json'

export default {
  components: {
    LiverSelect,
  },
  data () {
    return {
      livers: liverData,
      selectedLivers: [],
    }
  },
  computed: {
    generatedText() {
      let result = ''
      for (const liver of this.selectedLivers) {
        result += `${liver.name} さん
[YouTube]
https://www.youtube.com/channel/${liver.youtube}
[Twitter]
https://twitter.com/${liver.twitter}

`
      }
      return result
    }
  },
  methods: {
    copyResult() {
      const textarea = this.$refs.result
      textarea.focus()
      textarea.select()

      try {
        const successful = document.execCommand('copy')
        if (!successful) {
          alert('コピーに失敗しました')
        }
      } catch (err) {
        alert('コピーに失敗しました')
      }
    }
  }
}
</script>

<style>
.result-box {
  position: sticky !important;
  top: 20px;
}
</style>
