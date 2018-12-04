import Account from '@/views/Account'
import Activities from '@/views/Activities'
import Booking from '@/views/Booking'
import Family from '@/views/Family'
import Home from '@/views/Home'

export default [
  {
    path: '/',
    name: 'home',
    meta: { title: 'HOME' },
    component: Home
  },
  {
    path: '/favorites',
    name: 'favorites',
    meta: { title: 'FAVORITES' },
    component: Activities
  },
  {
    path: '/going',
    name: 'going',
    meta: { title: 'I`M GOING' },
    component: Activities
  },
  {
    path: '/past-booked',
    name: 'past-booked',
    meta: { title: 'PAST BOOKED' },
    component: Activities
  },
  {
    path: '/account',
    name: 'account',
    meta: { title: 'MY ACCOUNT' },
    component: Account
  },
  {
    path: '/booking/:id',
    name: 'booking',
    meta: { title: 'BOOKING' },
    component: Booking
  },
  {
    path: '/family',
    name: 'family',
    meta: { title: 'MY FAMILY' },
    component: Family
  }
]