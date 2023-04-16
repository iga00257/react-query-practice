// All components mapping with path for internal routes

import { lazy } from 'react'

const Page404 = lazy(async () => await import('../pages/404'))

const Welcome = lazy(async () => await import('../pages/Welcome'))
const Dashboard = lazy(async () => await import('../pages/Dashboard'))
const Login = lazy(async () => await import('../pages/Login'))
// const Blank = lazy(async () => await import('../pages/protected/Blank'))
// const Components = lazy(async () => await import('../pages/Components'))
// const ProfileSettings = lazy(async () => await import('../pages/protected/ProfileSettings'))

const routes = [
  {
    path: '/welcome', // the url
    component: Welcome // view rendered
  },
  {
    path: '/404',
    component: Page404
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    component: Login
  }

]

export default routes
