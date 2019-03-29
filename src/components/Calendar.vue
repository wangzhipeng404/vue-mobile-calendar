<template>
  <div class="calendar-container">
    <render :months="months" @select="onSelect" />
  </div>
</template>

<script>
import {
  getRangeDays,
  formatDate,
  compareDay,
  getNextMonth,
  createMonth,
} from './dateHelpers'
import Render from './Render.vue'

export default {
  name: 'calendar-wrap',
  components: {
    Render,
  },
  props: {
    selectable: {
      type: Array,
    },
    selected: {
      type: Array,
    },
    contents: {
      type: Object,
      default: () => {},
    },
    mode: {
      type: String,
      default: 'range',
    },
    min: {
      type: [Date, String],
    },
    max: {
      type: [Date, String],
    },
    startDate: {
      type: [Date, String],
      default: () => new Date(),
    },
    monthNum: {
      type: Number,
      default: 12,
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    includeDate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      start: '',
      end: '',
    }
  },
  computed: {
    selectableList() {
      if (this.selectable) {
        return this.selectable
      }
      const selectable = []
      this.rawMonths.forEach((m) => {
        m.days.forEach((d) => {
          let flag = true
          if (!d.belong) {
            flag = false
          }
          if (flag && this.min) {
            flag = compareDay(this.min, d.str) < 1
          }
          if (flag && this.max) {
            flag = compareDay(d.str, this.max) < 1
          }
          if (flag) {
            selectable.push(d.str)
          }
        })
      })
      return selectable
    },
    selectedList() {
      if (this.selected && this.selected.isArray()) {
        return this.selected
      }
      return getRangeDays(this.start, this.end).map(date => formatDate(date, this.format))
    },
    rawMonths() {
      const months = []
      let date = new Date(this.startDate)
      for (let i = 0; i < this.monthNum; i++) {
        if (i > 0) {
          date = getNextMonth(date)
        }
        months.push({
          str: formatDate(date, 'YYYY-MM'),
          month: formatDate(date, 'M'),
          days: createMonth(date, this.dayFactory),
        })
      }
      return months
    },
    months() {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      return this.rawMonths.map((m) => {
        m.days = m.days.map((d) => {
          d.class = [
            d.belong ? '' : 'hidden',
            this.selectableList.includes(d.str) ? 'selectable' : 'disabled',
            d.compareToday === 0 ? 'today' : '',
            this.selectedList.includes(d.str) ? 'selected' : '',
          ].filter(c => c).join(' ')
          d.contents = this.contents[d.str] || []
          return d
        })
        return m
      })
    },
  },
  methods: {
    onSelect(day) {
      if (this.mode === 'range') {
        this.rangleSelect(day)
      } else {
        this.singleSelect(day)
      }
      this.$emit('change', this.selectedList, day)
    },
    singleSelect(day) {
      this.start = day.str
    },
    rangleSelect(day) {
      if (this.end) {
        this.start = day.str
        this.end = ''
        return
      }
      if (!this.start) {
        this.start = day.str
        return
      }
      if (compareDay(day.str, this.start) < 1) {
        this.start = day.str
        return
      }
      this.end = day.str
    },
    dayFactory(date) {
      const str = formatDate(date, this.format)
      const now = new Date()
      const day = {
        str,
        day: formatDate(date, 'D'),
        compareToday: compareDay(date, now),
      }
      if (this.includeDate) {
        day.date = date
      }
      return day
    },
  },
}
</script>
