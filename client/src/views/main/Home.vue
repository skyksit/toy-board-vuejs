<template>
  <div
    class="container"
    style="margin-top:100px"
  >
    <div class="row">
      <board-list />
      <board-list />
      <board-list />
      <board-list />
    </div>
  </div>
</template>
<script>
import BoardList from '@/components/board/BoardList';

export default {
  components : {
    BoardList
  }
}
</script>