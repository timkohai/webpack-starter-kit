import store from '../state/store'

const data = {id: 1, title: 'challenge 1'}
console.log('set challenges from challenges module', data)
store.setData('challenges', data );