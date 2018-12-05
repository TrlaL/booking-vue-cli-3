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
              @changePerson="changePerson"
            />
            <a class="add" @click="addPerson('kid')">+ Add Kid Profile</a>
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
              @changePerson="changePerson"
            />
            <a class="add" @click="addPerson('caregiver')">+ Add Caregiver Profile</a>
          </div>
          <Loading v-else />
        </div>
        <div class="block">
          <a class="add-attendee" @click="additionalVisible = !additionalVisible">Add attendee(s) without adding to profile</a>
          <template v-if="additionalVisible">
            <div class="additional">
              <div>Additional kid(s):</div>
              <div>
                <Counter v-model="additionalKids" />
                <span>${{ additionalKids * item.price }}</span>
              </div>
            </div>
            <div class="additional">
              <div>Additional adult(s):</div>
              <div>
                <Counter v-model="additionalAdults" />
                <span>${{ additionalAdults * item.price }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      <BookingTotal :totalSum="totalSum" @book="handle" />
    </div>
  </div>
</template>

<script>
import BookingPerson from './BookingPerson'
import BookingTotal from './BookingTotal'
import Counter from '../common/Counter'
import Loading from '../common/Loading'

export default {
  components: {
    BookingPerson,
    BookingTotal,
    Counter,
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
      additionalVisible: false,
      additionalKids: 0,
      additionalAdults: 0,
      selectedPersons: []
    }
  },
  computed: {
    caregivers () {
      return this.members.filter(member => !member.isChild)
    },
    kids () {
      return this.members.filter(member => member.isChild)
    },
    newPersons () {
      return this.members.filter(member => member.isNew)
    },
    totalSum () {
      return this.item.price * (this.selectedPersons.length + this.additionalKids + this.additionalAdults)
    }
  },
  methods: {
    addPerson (type) {
      this.members.push({
        isNew: true,
        isChild: type === 'kid' ? 1 : 0,
        fullName: ''
      })
    },
    changePerson (person) {
      if (person.isActive) return this.selectedPersons.push(person)
      this.selectedPersons = this.selectedPersons.filter(pers => pers.i !== person.i)
    },
    handle () {
      this.$emit('newPersons', this.newPersons)
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

.add {
  color: #D9429F;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}

.add-attendee {
  color: #918A8C;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  justify-content: flex-end;
  padding: 0;
  text-decoration: underline;
  user-select: none;
}

.additional {
  align-items: center;
  color: #918A8C;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  margin: 7px 0 7px 0;

  div:last-child {
    align-items: center;
    display: flex;

    span {
      width: 50px;
      text-align: right;
    }
  }
}
</style>