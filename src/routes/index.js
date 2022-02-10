import { lazy } from 'react'


// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Locations = lazy(() => import('../pages/Locations'))
const Location = lazy(() => import('../pages/Location'))
const Drone = lazy(() => import("../pages/Drone"))
const Part = lazy(() => import("../pages/Part"))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))
const StockLevels = lazy(() => import("../pages/StockLevels"))
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/locations',
    component: Locations,
  },
  {
    path: '/locations/:location',
    component: Location,
  },
  {
    path: '/drones/:droneId',
    component: Drone,
  },
  {
    path: '/parts/:partId',
    component: Part,
  },
  {
    path: '/stocklevels',
    component: StockLevels,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
