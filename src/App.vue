<template>
  <div id="app">
    <calendar
      @change="onChange"
      :selectable="selectableList"
      :contents="contents"
      :mode="mode"
      :month-num="12"
      :start-date="'2019-01-01'"
    />
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'

export default {
  name: 'app',
  components: {
    Calendar,
  },
  data() {
    return {
      selectableList: null,
      selected: [],
      start: '',
      end: '',
      now: new Date(),
    }
  },
  computed: {
    contents() {
      return {}
    },
    mode() {
      return 'range'
    },
  },
  methods: {
    onChange(selected, day) {
      console.log(selected, day)
    },
  },
}
</script>
