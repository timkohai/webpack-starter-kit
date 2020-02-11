import store from '../state/store'

// console.log('offers', store)
const data = {id: 1, title: 'offers 1'}
console.log('set offers from offers module', data)
store.setData('offers', data );