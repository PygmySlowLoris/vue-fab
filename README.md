#   FAB

Floating Action Button for Vue.

The component supports multiple action buttons so you can add as many actions as you need. It will fire an event to the parent when clicking on each one. 

##  Installation

```
npm install vue-fab --save
```

##  Dependencies

Include the following stylesheets on your document's <head>

```
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

And 

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
```

##  Properties

`style` - Sets the background color.
*   Type - Object 
*   Properties:
    *   `bgColor`

`actions` - Sets a list of actions.
*   Type - Object 
*   Properties:
    *   `name` Name of the event.
    *   `icon` Icon name. (Please refer to [Material icons](https://material.io/icons/))

##  Examples

```
<template>
  <fab :styles="fabStyles"
               :actions="fabActions"
               @cache="cache"
               @alertMe="alert"
          ></fab>
</template>

<script>
import fab from 'vue-fab'

export default {
  components: {
    fab
  },
   data(){
      return {
          fabStyles: {
              bgColor: '#778899'
          },
          fabActions: [
              {
                  name: 'cache',
                  icon: 'cached'
              },
              {
                  name: 'alertMe',
                  icon: 'add_alert'
              }
          ]
      }
  },
  methods:{
      cache(){
          console.log('Cache Cleared');
      },
      alert(){
          alert('Clicked on alert icon');
      }
  }
}
</script>
```