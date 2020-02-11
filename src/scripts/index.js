var Stellar = {}
window.Stellar = Stellar

import { h, app } from "./hyperapp"
import { Http } from "./http"
import {interval} from "./time"

import './style.css';

// -- UTILITY --
const emphasize = (word, string) =>
  string.split(" ").map(x => {
    if (x.toLowerCase() === word.toLowerCase()) {
      return h("em", {}, x + " ")
    } else {
      return x + " "
    }
  }) 

        
// -- ACTIONS --

const ToggleAutoUpdate = state => ({...state, autoUpdate: !state.autoUpdate})
const StartEditingFilter = state => ({...state, editingFilter: true})
const StopEditingFilter = state => [
  {
    ...state,
    editingFilter: false,
  },
  Http({                                                                            // <---
    url: `https://zaceno.github.io/hatut/data/${state.filter.toLowerCase()}.json`,  // <---
    response: "json",                                                               // <---
    action: GotStories,                                                             // <---
  })    
]


const FetchStories = state => {
    console.log(state)
    
    return [
  {...state, fetching: true},
  Http({
    url: `https://zaceno.github.io/hatut/data/${state.filter.toLowerCase()}.json`,
    response: 'json',
    action: GotStories,
  })
]

}

const SetFilter = (state, word) => ({...state, filter: word})
const SelectStory = (state, id) => ({
  ...state, // keep all state the same, except for the following:
  reading: id,
  stories: {
    ...state.stories, //keep stories the same, except for:
    [id]: {
      ...state.stories[id],  //keep this story the same, except for:
      seen: true,
    }
  }
})

const GotStories = (state, response) => {
  const stories = {}
  Object.keys(response).forEach(id => {
    stories[id] = {...response[id], seen: false}
    if (state.stories[id] && state.stories[id].seen) {
      stories[id].seen = true
    }
  })
  const reading = stories[state.reading] ? state.reading :  null
  return {
    ...state,
    stories,
    reading,
    fetching: false,          // <---
  }
}
                
// -- VIEWS --
const StoryThumbnail = props => h(
  "li",
  { 
    onClick: [SelectStory, props.id],
    class: {
      unread: props.unread,
      reading: props.reading,
    }
  },
  [
    h("p", {class: "title"}, emphasize(props.filter, props.title)),
    h("p", {class: "author"}, props.author)
  ]
)
			
const StoryList = props => h("div", {class: "stories"}, [

  props.fetching && h("div", {class: "loadscreen"}, [  // <---
    h("div", {class: "spinner"})                       // <---
  ]),                                                  // <---
  
  h("ul", {}, Object.keys(props.stories).map(id => 
    StoryThumbnail({
      id,    
      title: props.stories[id].title,
      author: props.stories[id].author,
      unread: !props.stories[id].seen,
      reading: props.reading === id,
      filter: props.filter
    })
  ))
])

const Filter = props => h("div", {class: "filter"}, [
  "Filter:",
    
  props.editingFilter
  ? h("input", {
    type: "text",
    value: props.filter,
    onInput: [SetFilter, event => event.target.value],   // <----
  })
  : h("span", {class: "filter-word"}, props.filter),

  props.editingFilter
  ? h("button", {onClick: StopEditingFilter}, "\u2713") 
  : h("button", {onClick: StartEditingFilter}, "\u270E"), 
])

const StoryDetail = props => h("div", {class: "story"}, [
  props && h("h1", {}, props.title),
  props && h("p", {}, `
    Lorem ipsum dolor sit amet, consectetur adipiscing
    elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, qui
    nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat.
  `),
   props && h("p", {class: "signature"}, props.author)
])

const AutoUpdate = props => h("div", {class: "autoupdate"}, [
  "Auto update: ",
  h("input", {
    type: "checkbox",
    checked: props.autoUpdate, // <---
    onInput: ToggleAutoUpdate, // <---
  })
])

const Container = content => h("div", {class: "container"}, content)			
			
        
        
// -- RUN --



var selector = document.querySelectorAll('.stellar-offers')
selector.forEach( elem => {
    app({
        node: elem,
        init: FetchStories({
            editingFilter: false,
            autoUpdate: false,
            filter: "ocean",
            reading: null,
            stories: {},
        }),
        view: state => Container([
        Filter(state),
        StoryList(state),
        StoryDetail(state.reading && state.stories[state.reading]),
        AutoUpdate(state),
        ])
        // ,
        // subscriptions: state => [
        //   state.autoUpdate && interval(FetchStories, {delay: 5000})
        // ]
    })
})





