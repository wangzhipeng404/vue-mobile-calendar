import fecha from 'fecha'

export function compareDay(day1, day2) {
  const date1 = fecha.format(new Date(day1), 'YYYYMMDD')
  const date2 = fecha.format(new Date(day2), 'YYYYMMDD')

  if (date1 > date2) {
    return 1
  }
  if (date1 === date2) {
    return 0
  }
  return -1
}
export function getNextDate(datesArray, referenceDate) {
  const now = new Date(referenceDate)
  let closest = Infinity

  datesArray.forEach((d) => {
    const date = new Date(d)
    if (date >= now && date < closest) {
      closest = d
    }
  })

  if (closest === Infinity) {
    return null
  }
  return closest
}

export function nextDateByDayOfWeek(weekDay, referenceDate) {
  const newReferenceDate = new Date(referenceDate)
  let weekday = weekDay.toLowerCase()
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]
  const referenceDateDay = newReferenceDate.getDay()

  for (let i = 7; i--;) {
    if (weekday === days[i]) {
      weekday = (i <= referenceDateDay)
        ? (i + 7)
        : i
      break
    }
  }

  const daysUntilNext = weekday - referenceDateDay

  return referenceDate.setDate(referenceDate.getDate() + daysUntilNext)
}

export function nextDateByDayOfWeekArray(daysArray, referenceDate) {
  const tempArray = []
  for (let i = 0; i < daysArray.length; i++) {
    tempArray.push(new Date(nextDateByDayOfWeek(daysArray[i], referenceDate)))
  }
  return getNextDate(tempArray, referenceDate)
}
export function isDateLessOrEquals(time1, time2) {
  return new Date(time1) <= new Date(time2)
}

export function countDays(start, end) {
  const oneDay = 24 * 60 * 60 * 1000
  const firstDate = new Date(start)
  const secondDate = new Date(end)

  return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)))
}

export function addDays(date, quantity) {
  const result = new Date(date)
  result.setDate(result.getDate() + quantity)
  return result
}

export function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function getFirstDay(date, firstDayOfWeek) {
  const firstDay = getFirstDayOfMonth(date)
  let offset = 0
  if (firstDayOfWeek > 0) {
    offset = firstDay.getDay() === 0
      ? -7 + firstDayOfWeek
      : firstDayOfWeek
  }
  return new Date(firstDay.setDate(firstDay.getDate() - (firstDay.getDay() - offset)))
}

export function getNextMonth(date) {
  let nextMonth

  if (date.getMonth() === 11) {
    nextMonth = new Date(date.getFullYear() + 1, 0, 1)
  } else {
    nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1)
  }
  return nextMonth
}

export function formatDate(date, format = 'YYYY-MM-DD') {
  if (date) {
    return fecha.format(date, format)
  }
  return ''
}

export function createMonth(date, func) {
  const firstDay = getFirstDay(date, 0)
  const days = []
  for (let i = 0; i < 42; i++) {
    const d = addDays(firstDay, i)
    const belong = d.getMonth() === date.getMonth()
    let day = {
      date: d,
      belong,
    }
    if (func) {
      day = func(d)
      day.belong = belong
    }
    days.push(day)
  }
  return days
}

export function createMonths(n) {
  const months = []
  let date = new Date()
  months.push({
    str: fecha.format(date, 'YYYY-MM'),
    month: fecha.format(date, 'M'),
    days: createMonth(date),
  })
  for (let i = 1; i < n; i++) {
    date = getNextMonth(date)
    months.push({
      str: fecha.format(date, 'YYYY-MM'),
      month: fecha.format(date, 'M'),
      days: createMonth(date),
    })
  }
  return months
}

export function getRangeDays(start, end) {
  if (!start) {
    return []
  }
  const date = new Date(start)
  const days = [date]
  if (!end) {
    return days
  }
  const count = countDays(start, end)
  for (let i = 1; i <= count; i++) {
    days.push(addDays(date, i))
  }
  return days
}
