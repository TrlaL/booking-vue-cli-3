<template>
  <div class="booking">
    <Modal class="modal-message" id="booking">{{ message }}</Modal>
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
              @handleError="showModal"
              @savePerson="savePerson"
            />
            <div v-show="!kids.length">You have not added children yet</div>
            <div class="add">
              <a @click="addPerson('kid')">+ Add Kid Profile</a>
            </div>
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
              @handleError="showModal"
              @savePerson="savePerson"
            />
            <div v-show="!caregivers.length">You have not added children yet</div>
            <div class="add">
              <a @click="addPerson('caregiver')">+ Add Caregiver Profile</a>
            </div>
          </div>
          <Loading v-else />
        </div>
        <div class="block">
          <a class="add-attendee" @click="toggleAttendees">Add attendee(s) without adding to profile</a>
          <template v-if="additionalVisible">
            <div class="additional">
              <div>Additional kid(s):</div>
              <div>
                <Counter v-model="childsCount" @input="calculate" />
                <span>${{ childsCount * item.price }}</span>
              </div>
            </div>
            <div class="additional">
              <div>Additional adult(s):</div>
              <div>
                <Counter v-model="adultsCount" @input="calculate" />
                <span>${{ adultsCount * item.price }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      <BookingTotal
        :cards="cards"
        :fee="fee"
        :price="price"
        @book="book"
        @handleError="showModal"
      />
    </div>
  </div>
</template>

<script>
import braintree from 'braintree-web'
import BookingPerson from '@/components/booking/BookingPerson'
import BookingTotal from '@/components/booking/BookingTotal'
import Counter from '@/components/common/Counter'
import Loading from '@/components/common/Loading'
import Modal from '@/components/common/Modal'
import { getActivity } from '@/api/activities'
import { createBooking, calculateDraft } from '@/api/bookings'
import { getCards } from '@/api/cards'
import { getClientToken, getFamilyMembers, saveAdult, saveChild } from '@/api/profile'

export default {
  components: { BookingPerson, BookingTotal, Counter, Loading, Modal },
  data () {
    return {
      additionalVisible: false,
      adultsCount: 0,
      childsCount: 0,
      cards: [],
      clientToken: '',
      fee: 0,
      isLoaded: false,
      item: {},
      members: [],
      message: '',
      price: 0,
      selectedPersons: []
    }
  },
  computed: {
    activityId () {
      return this.$route.params.id
    },
    body () {
      return {
        activityId: this.item.id,
        activityDate: '2019-01-01',
        adultsCount: this.adultsCount,
        childsCount: this.childsCount,
        familyMembers: this.selectedPersons.map(person => person.id),
        useMoney: false,
        withOwner: false
      }
    },
    caregivers () {
      return this.members.filter(member => !member.isChild)
    },
    kids () {
      return this.members.filter(member => member.isChild)
    },
    newPersons () {
      return this.members.filter(member => member.isNew)
    }
  },
  created () {
    this.getClientToken()
    this.getActivity(this.activityId)
    this.getFamilyMembers()
    this.getCards()
  },
  methods: {
    async createBooking (data) {
      let response = await createBooking(data)
      console.log(response)
    },
    async calculateDraft (data) {
      let response = await calculateDraft(data)
      if (response.data) {
        this.price = response.data.price
        this.fee = response.data.fee
      }
    },
    async getActivity (id) {
      let response = await getActivity(id)
      if (response.data.return) {
        this.item = response.data.item
      } else {
        this.$router.push('/not-found')
      }
    },
    async getCards () {
      let response = await getCards()
      if (response.data) this.cards = response.data
    },
    async getClientToken () {
      let response = await getClientToken()
      if (response.data) this.clientToken = response.data.token
    },
    async getFamilyMembers () {
      let response = await getFamilyMembers()
      if (response.data) {
        this.isLoaded = true
        this.members = response.data.list.map((member, index) => {
          return { ...member, index }
        })
      }
    },
    async saveAdult (data) {
      let response = await saveAdult(data)
      if (response.data.result) {
        this.getFamilyMembers()
      }
    },
    async saveChild (data) {
      let response = await saveChild(data)
      if (response.data.result) {
        this.getFamilyMembers()
      }
    },
    addPerson (type) {
      this.members.push({
        isNew: true,
        isChild: type === 'kid' ? 1 : 0,
        fullName: ''
      })
    },
    book (card) {
      // this.newPersons.forEach(person => {
      //   let api = person.isChild ? this.saveChild : this.saveAdult
      //   api({ fullName: person.fullName })
      // })
      braintree.client.create({
        authorization: this.clientToken
      }, (error, client) => {
        client.request({
          endpoint: 'payment_methods/credit_cards',
          method: 'post',
          data: {
            creditCard: {
              number: card.number,
              expirationDate: card.expireDate,
              cvv: '123'
            }
          }
        }, (error, response) => {
          if (error) return console.log(error)
          this.createBooking({
            ...this.body,
            paymentNonce: response.creditCards[0].nonce
          })
        })
      })
    },
    calculate () {
      this.calculateDraft(this.body)
    },
    changePerson (person) {
      if (person.isActive) {
        this.selectedPersons.push(person)
      } else {
        this.selectedPersons = this.selectedPersons.filter(pers => pers.index !== person.index)
      }
      this.calculate()
    },
    savePerson (person, isChild) {
      if (isChild) return this.saveChild(person)
      this.saveAdult(person)
    },
    showModal (message) {
      this.message = message
      this.$store.commit('SET_MODAL_VISIBLE', { id: 'booking', visible: true })
    },
    toggleAttendees () {
      this.additionalVisible = !this.additionalVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-message {
  font-size: 18px;
  text-align: center;
}

.add {
  color: #D9429F;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  justify-content: flex-end;
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

@include desktop {
  .booking {
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
</style>