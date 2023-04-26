<template>
   <button :style="{ backgroundColor: bgColor, border: border ? '1px solid black' : 'none' }">{{ text }}</button>
</template>

<script>
   export default {
      props: {
         text: {
            type: String,
            default: 'Button'
         },
         bgColor: {
            type: String,
            default: 'bg-dune-600'
         },
         border: {
            type: Boolean,
            default: true
         }
      }
   }
</script>