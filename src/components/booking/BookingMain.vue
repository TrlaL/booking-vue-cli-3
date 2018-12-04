<template>
  <div class="booking-main">
    <div class="header">
      CHOOSE ATTENDEE(S)
      <div>Only those who require a seat/ticket</div>
    </div>
    <div class="content box">
      <div class="top">
        <span>{{ item.name || 'Loading...' }}</span>
        <span>Total available seats: 0</span>
      </div>
      <div class="blocks">
        <div class="block">
          <div class="title">KID(S):</div>
          <div class="persons" v-if="isLoaded">
            <BookingPerson
              v-for="(kid, i) in kids"
              :key="i"
              :person="kid"
              :price="item.price"
              @changePerson="changeKid"
            />
            <a class="add" href="#">+ Add Kid Profile</a>
          </div>
          <Loading v-else />
        </div>
        <div class="block">
          <div class="title">CAREGIVERS/ADULTS:</div>
          <div class="persons" v-if="isLoaded">
            <BookingPerson
              v-for="(caregiver, i) in caregivers"
              :key="i"
              :person="caregiver"
              :price="item.price"
              @changePerson="changeCaregiver"
            />
            <a class="add" href="#">+ Add Kid Profile</a>
            <a class="add-attendee" href="#">Add attendee(s) without adding to profile</a>
          </div>
          <Loading v-else />
        </div>
      </div>
      <BookingTotal :totalSum="totalSum" />
    </div>
  </div>
</template>

<script>
import BookingPerson from './BookingPerson'
import BookingTotal from './BookingTotal'
import Loading from '../common/Loading'

export default {
  components: {
    BookingPerson,
    BookingTotal,
    Loading
  },
  props: {
    isLoaded: {
      required: true,
      type: Boolean
    },
    item: {
      required: true,
      type: Object
    },
    members: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      selectedCaregivers: [],
      selectedKids: []
    }
  },
  computed: {
    caregivers () {
      return this.members.filter(member => !member.isChild)
    },
    kids () {
      return this.members.filter(member => member.isChild)
    },
    totalPersons () {
      return this.selectedCaregivers.length + this.selectedKids.length
    },
    totalSum () {
      return this.totalPersons * this.item.price
    }
  },
  methods: {
    changeCaregiver (id, active) {
      if (active) {
        this.selectedCaregivers.push(id)
      } else {
        this.selectedCaregivers = this.selectedCaregivers.filter(personId => personId !== id)
      }
    },
    changeKid (id, active) {
      if (active) {
        this.selectedKids.push(id)
      } else {
        this.selectedKids = this.selectedKids.filter(personId => personId !== id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@include desktop {
  .booking-main {
    padding: 40px 0 40px 0;
  }

  .header {
    color: #BDBDBD;
    font-size: 20px;
    line-height: 18px;
    margin-bottom: 40px;
    text-align: center;

    div {
      color: #4F4F4F;
      font-size: 20px;
      line-height: 11px;
      margin-top: 15px;
      text-align: center;
    }
  }

  .content {
    border-radius: 20px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    margin: auto;
    margin-top: 25px;
    max-width: 700px;
    padding: 35px 115px 35px 115px;
  }

  .top {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;

    span {
      align-items: center;
      display: flex;
    }

    span:first-child {
      font-size: 18px;
      font-weight: bold;
    }

    span:last-child {
      color: #918A8C;
      font-size: 16px;
      font-weight: 400;
    }
  }

  .block {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    padding-bottom: 20px;

    &:last-child {
      border: 0;
      margin: 0;
    }

    .title {
      color: #918A8C;
      font-size: 12px;
      font-weight: 300;
      margin-bottom: 12px;
    }
  }
}

.add {
  color: #D9429F;
  font-size: 14px;
}

.add-attendee {
  color: #918A8C;
  display: flex;
  font-size: 11px;
  justify-content: flex-end;
}

@include mobile {
  .header {
    display: none;
  }

  .content {
    all: unset;
  }

  .top {
    background: #eee;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    padding: 20px;

    span:first-child {
      font-weight: bold;
    }

    span:last-child {
      color: #918A8C;;
    }
  }

  .block {
    padding: 20px;
  }

  .title {
    color: #918A8C;
    margin-bottom: 10px;
  }

  .add-attendee {
    padding-right: 20px;
  }
}
</style>