<template>
  <div
    class="container"
    style="margin-top:100px"
  >
    <div class="row">
      <div class="col-sm-3" />
      <div class="col-sm-6">
        <div class="card shadow">
          <div class="card-body">
            <div class="form-group">
              <label for="boardWriterName">작성자</label>
              <input
                id="boardWriterName"
                v-model="boardWriterName"
                type="text"
                class="form-control"
                disabled="disabled"
              >
            </div>
            <div class="form-group">
              <label for="boardDate">작성날짜</label>
              <input
                id="boardDate"
                v-model="boardDate"
                type="text"
                class="form-control"
                disabled="disabled"
              >
            </div>
            <div class="form-group">
              <label for="boardSubject">제목</label>
              <input
                id="boardSubject"
                ref="boardSubject"
                v-model="boardSubject"
                type="text"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="boardContent">내용</label>
              <textarea
                id="boardContent"
                ref="boardContent"
                v-model="boardContent"
                class="form-control"
                rows="10"
                style="resize:none"
              />
            </div>
            <div class="form-group">
              <label for="board_file">첨부 이미지</label>
              <img
                :src="boardImage"
                width="100%"
              >	
              <input
                id="board_file"
                type="file"
                name="board_file"
                class="form-control"
                accept="image/*"
              >					
            </div>
            <div class="form-group">
              <div class="text-right">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="checkInput"
                >
                  수정완료
                </button>
                <a
                  href="board_read.html"
                  class="btn btn-info"
                >취소</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      boardWriterName : '김병철',
      boardDate : '2020-04-24',
      boardSubject : '제목',
      boardContent : '내용',
      boardImage : require('@/assets/logo.png')
    }
  },
  methods : {
    checkInput : function() {
      if(this.boardSubject.length == 0) {
        alert("제목을 입력하세요");
        this.$refs.boardSubject.focus();
        return;
      }
      if(this.boardContent.length == 0) {
        alert("내용을 입력하세요");
        this.$refs.boardContent.focus();
        return;
      }
      alert('수정되었습니다');
      this.$router.push('/boardView');
    }
  }
}
</script>