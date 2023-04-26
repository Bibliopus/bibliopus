<template>
   <div class="modal-overlay absolute inset-0 flex justify-center bg-dune-950 bg-opacity-60 z-10" @click="$emit('close-modal')">
      <div class="flex flex-col justify-between text-center w-1/4 h-2/5 bg-dune-50 m-auto p-8 rounded-3xl">
         <img src="../assets/img/logo.svg" class="w-14 mx-auto" width="56px" height="35" />
         <div>
            <h2 class="text-2xl font-bold mb-2">Registration confirmed</h2>
            <img class="mx-auto" src="../assets/img/check.svg" width="80" height="80" alt="#">
         </div>
         <p>We will inform you by mail of each new update and features</p>
         <button @click="$emit('close-modal')">Close</button>
      </div>
   </div>
</template>

<script>
   export default {}
</script>