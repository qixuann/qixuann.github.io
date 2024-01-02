import { createRouter, createWebHistory } from 'vue-router'
import GuestCheckInStatus from '../views/GuestCheckInStatus.vue'
import ParkingRedemption from '../views/ParkingRedemption.vue'

const routes = [
  {
    path: '/',
    name: 'GuestCheckInStatus',
    component: GuestCheckInStatus
  },
  {
    path: '/parking-redemption',
    name: 'ParkingRedemption',
    component: ParkingRedemption
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
