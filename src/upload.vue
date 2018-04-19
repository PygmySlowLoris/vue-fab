<template>
  <label>
    <i class='material-icons'>file_upload</i>
    <input type='file' @change='change' multiple hidden />
  </label>
</template>

<script lang='coffee'>
module.exports =
  methods:
    change: (event) ->
      console.log event.target.files
</script>

<style lang='scss' scoped>
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);

label {
  cursor: inherit;
  i {
    vertical-align: middle;
    font-size: inherit;
  }
}

label.md-18 {
  width: 18px;
}

label.md-24 {
  width: 24px;
}

label.md-36 {
  width: 36px;
}
</style>
