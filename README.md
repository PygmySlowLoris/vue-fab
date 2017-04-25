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

Include the component in your .vue file, `styles` & `actions` props are required for the component to work. The `@event` has to match the name given in the `actions` prop. 
```
<template>
  <fab :styles="fabStyles"
       :actions="fabActions"
       @cache="cache"
       @alertMe="alert"
  ></fab>
</template>
```

Match your data with your components props. The `bgColor` accepts either HEX, RBG or RGBA format.

<b>Remember:</b> Only material icons are accepted.
```
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