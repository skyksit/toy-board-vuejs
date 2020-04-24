<template>
  <div class="container" style="margin-top:100px">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="card shadow">
          <div class="card-body">
            <div class="form-group">
              <label for="boardWriterName">작성자</label>
              <input type="text" id="boardWriterName" v-model="boardWriterName" class="form-control" disabled="disabled"/>
            </div>
            <div class="form-group">
              <label for="boardDate">작성날짜</label>
              <input type="text" id="boardDate" v-model="boardDate" class="form-control" disabled="disabled"/>
            </div>
            <div class="form-group">
              <label for="boardSubject">제목</label>
              <input type="text" id="boardSubject" v-model="boardSubject" class="form-control"/>
            </div>
            <div class="form-group">
              <label for="boardContent">내용</label>
              <textarea id="boardContent" v-model="boardContent" class="form-control" rows="10" style="resize:none"></textarea>
            </div>
            <div class="form-group">
              <label for="board_file">첨부 이미지</label>
              <img :src="boardImage" width="100%"/>	
              <input type="file" name="board_file" id="board_file" class="form-control" accept="image/*"/>					
            </div>
            <div class="form-group">
              <div class="text-right">
                <button type="button" @click='checkInput' class="btn btn-primary">수정완료</button>
                <a href="board_read.html" class="btn btn-info">취소</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3"></div>
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
        this.$refs.boardSubject.$el.focus();
        return;
      }
      if(this.boardContent.length == 0) {
        alert("내용을 입력하세요");
        this.$refs.boardContent.$el.focus();
        return;
      }
      alert('수정되었습니다');
      this.$router.push('/boardView');
    }
  }
}
</script>