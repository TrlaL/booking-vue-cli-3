import Account from '@/views/Account'
import Activities from '@/views/Activities'
import Booking from '@/views/Booking'
import Family from '@/views/Family'
import NotFound from '@/views/NotFound'

export default [
  {
    path: '/',
    name: 'activities',
    meta: { id: 0, title: 'ACTIVITIES' },
    component: Activities
  },
  {
    path: '/favorites',
    name: 'favorites',
    meta: { id: 1, title: 'FAVORITES' },
    component: Activities
  },
  {
    path: '/going',
    name: 'going',
    meta: { id: 2, title: 'I`M GOING' },
    component: Activities
  },
  {
    path: '/past-booked',
    name: 'past-booked',
    meta: { id: 3, title: 'PAST BOOKED' },
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
  },
  {
    path: '/not-found',
    name: 'not-found',
    meta: { title: 'NOT FOUND' },
    component: NotFound
  }
]