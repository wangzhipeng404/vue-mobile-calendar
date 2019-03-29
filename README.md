# vue-hotel-calendar

## Props/Options

### mode

- Type: `String`
- Default: `range`

The select mode, 'range' or 'single'.
日历模式，区间或者单选,可选值为 'range' 或 'singel'

### selectable

- Type: `String []`
- Default: `null`

if parse this prop, dates not in  this array will diabled.
可选日期列表,传入的日期可以选择，其他禁用

### selected

- Type: `String []`
- Default: `null`

if parse this props, selected dates will be control by your self.
已选日期，传入的日期将会高亮，传入该参数将会禁用组件自身的已选列表，完全交由外部控制

### contents

- Type: `Object`
- Default: `range`

The extra content for days.
example
`{ '2019-04-01': ['￥100']}`
额外的日期信息

### format

- Type: `String`
- Default: `YYYY-MM-DD`
日期格式化

The date format string.

### startDate

- Type: `Date`
- Default: `new Date()`

The initial value of the start mounth date.
起始日期，日历将会从该日期所在月份开始渲染

### monthNum

- Type: `Number`
- Default: `12`

The months will render.
渲染多少个月

- Type: `Date`
- Default: `new Date()`

The initial value of the start mounth date.

### min

- Type: `Date` or `String`
- Default: `null`

The start view date. All the dates before this date will be disabled.
最小可选日期，该日期之前的日期将会被禁用

### max

- Type: `Date` or `String`
- Default: `null`

The end view date. All the dates after this date will be disabled.
最大可选日期，改日期之后的日期将会禁用

### includeDate

- Type: `Boolean`
- Default: `false`

if include Date  in daily object
是否在每日期对象中包含 Date 对象，为了兼容 mpvue 提升响应速度默认是不挂载Dated

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```
### Compiles and minifies for lib
```
yarn run build
```
### Compiles and minifies for production
```
yarn run build-app
```

### Lints and fixes files
```
yarn run lint
```




