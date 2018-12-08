<template>
  <div class="calendar">
    <div class="header">
      <div @click="prev"><img src="@/assets/images/arrow-left.svg"></div>
      <div>{{ monthName }} {{ selectedDate.year }}</div>
      <div @click="next"><img src="@/assets/images/arrow-right.svg"></div>
    </div>
    <div class="table">
      <div class="row">
        <div class="cell" v-for="(day, i) in daysOfWeek" :key="i">{{ day }}</div>
      </div>
      <div class="row" v-for="(row, i) in table" :key="i">
        <div class="cell date" v-for="(cell, j) in row" :class="classes(cell)" :key="j" @click="setDate(cell)">
          {{ cell }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { default: 0, type: Number }
  },
  data () {
    return {
      currentDate: {},
      daysOfWeek: 'SMTWTFS',
      monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ],
      selectedDate: {},
      sizes: [6, 7],
      table: [],
      val: 0
    }
  },
  computed: {
    monthName () {
      return this.monthNames[this.selectedDate.month]
    }
  },
  watch: {
    value (val) {
      if (val !== null) return
      this.draw()
      this.val = 0
    }
  },
  created () {
    this.currentDate = this.selectedDate = this.getDate()
    this.draw(new Date(2018, 11))
  },
  methods: {
    classes (date) {
      let cd = this.currentDate
      let sd = this.selectedDate
      return {
        current: cd.year === sd.year && cd.month === sd.month && cd.date === date,
        selected: this.val === new Date(sd.year, sd.month, date).getTime()
      }
    },
    draw (date) {
      let number = 1
      let started = false
      this.selectedDate = this.getDate(date)
      this.table = new Array(this.sizes[0]).fill().map((row, i) => {
        return new Array(this.sizes[1]).fill().map((cell, j) => {
          if (j >= this.selectedDate.firstDay && !started) started = true
          return (number <= this.selectedDate.lastDay && started) ? number++ : ''
        })
      })
    },
    getDate (date = new Date()) {
      let firstDate = new Date(date.getFullYear(), date.getMonth(), 1)
      let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        firstDay: firstDate.getDay(),
        lastDay: lastDate.getDate()
      }
    },
    next () {
      let isLastMonth = this.selectedDate.month === 11
      let year = isLastMonth ? this.selectedDate.year + 1 : this.selectedDate.year
      let month = isLastMonth ? 0 : this.selectedDate.month + 1
      this.draw(new Date(year, month))
    },
    prev () {
      let isFirstMonth = this.selectedDate.month === 0
      let year = isFirstMonth ? this.selectedDate.year - 1 : this.selectedDate.year
      let month = isFirstMonth ? 11 : this.selectedDate.month - 1
      this.draw(new Date(year, month))
    },
    setDate (date) {
      let time = new Date(this.selectedDate.year, this.selectedDate.month, date).getTime()
      this.val = (this.val === time) ? 0 : time
      this.$emit('input', this.val)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  img {
    cursor: pointer;
  }
}

.table {
  color: #333333;
  display: table;
  font-size: 15px;
  table-layout: fixed;
  text-align: center;
  user-select: none;
  width: 100%;
}

.row {
  display: table-row;
}

.cell {
  border-radius: 30px;
  display: table-cell;
}

.date {
  cursor: pointer;

  &.current {
    background: #ddd;
    font-weight: bold;
  }

  &.selected {
    background: #D9429F !important;
    color: #fff;
  }

  &:hover {
    background: #ddd;
  }
}
</style>