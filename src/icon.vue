<template>
  <component :is='icon' />
</template>
<script lang='coffee'>
Vue = require('vue').default

module.exports =
  props: [
    'actionIconSize'
    'action'
  ]
  computed:
    icon: ->
      Vue.component 'icon', 
        template: "<i>{{action.icon}}</i>"
        data: =>
          action: @action
      @action['icon-component'] || 'icon'
</script>
