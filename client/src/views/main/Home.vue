<template>
  <div
    class="container"
    style="margin-top:100px"
  >
    <div class="row">
      <BoardList />
      <BoardList />
      <BoardList />
      <BoardList />
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