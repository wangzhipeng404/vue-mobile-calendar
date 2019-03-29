<template>
  <div class="calendar-render-container">
    <div class="header">
      <div class="week-wrap">
        <div class="week-box" v-for="week in weeks" :key="week">{{week}}</div>
      </div>
    </div>
    <div class="body">
      <div class="month-panel" v-for="(month, mindex) in months" :key="month.str" :index="mindex">
        <div class="month-header">
          {{month.month + ' 月'}}
        </div>
        <div class="month-body">
          <div
            class="day-box"
            v-for="(day, dindex) in month.days"
            :key="day.str"
            :index="dindex"
            :class="day.class"
            @click="onSelect(day)"
          >
            <div class="day-text">{{day.day}}</div>
            <div class="content-wrap" v-if="day.contents">
              <div class="content-text" v-for="content in day.contents" :key="content">
                {{content}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calendar-render',
  props: {
    months: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    weeks() {
      return ['日', '一', '二', '三', '四', '五', '六']
    },
  },
  methods: {
    onSelect(day) {
      this.$emit('select', day)
    },
  },
}
</script>

<style lang="scss">
$white: #fff;
$black: #000;
$gray: #424b53;
$primary-text-color: #35343d;
$lightest-gray: #f3f5f8;
$primary-color: #00ca9d;
$medium-gray: #999999;
$light-gray: #d7d9e2;
$dark-gray: #2d3047;

.calendar-render-container {
  div {
    box-sizing: border-box;
  }
  padding-top: 30px;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $white;
    .week-wrap {
      display: flex;
      flex-wrap: wrap;
      .week-box {
        font-size: 18px;
        padding: 10px 0;
        text-align: center;
        width: calc(100% / 7);
      }
    }
  }
  .body {
    .month-panel {
      .month-header {
        text-align: center;
        padding: 10px 0;
        color: $primary-color;
        font-size: 18px;
      }
      .month-body {
        display: flex;
        flex-wrap: wrap;
        .day-box {
          width: calc(100% / 7);
          min-height: calc(100vw / 8);
          text-align: center;
          padding-top: 5px;
          border: 1px solid #fff;
          margin-top: 1px;
          font-size: 18px;
          .content-wrap {
            .content-text {
              font-size: 10px;
            }
          }
        }
        .today {
          border-color: $primary-color;
        }
        .hidden {
          visibility: hidden;
          pointer-events: none;
          min-height: 0;
          height: 0;
        }
        .disabled {
          color: $light-gray;
          pointer-events: none;
        }
        .selectable {
          color: $gray;
          cursor: pointer;
        }
        .selected {
          background-color: $primary-color;
          color: $white;
          border-color: $primary-color;
        }
      }
    }
  }
}
</style>
