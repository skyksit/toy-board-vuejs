<template>
  <div class="container" style="margin-top:100px">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="card shadow">
          <div class="card-body">
            <div class="form-group">
              <label for="board_writer_name">작성자</label>
              <input type="text" id="board_writer_name" v-model="boardWriterName" class="form-control" disabled="disabled"/>
            </div>
            <div class="form-group">
              <label for="board_date">작성날짜</label>
              <input type="text" id="board_date" v-model="boardDate" class="form-control" disabled="disabled"/>
            </div>
            <div class="form-group">
              <label for="board_subject">제목</label>
              <input type="text" id="board_subject" v-model="boardSubject" class="form-control" disabled="disabled"/>
            </div>
            <div class="form-group">
              <label for="board_content">내용</label>
              <textarea id="board_content" v-model="boardContent" class="form-control" rows="10" style="resize:none" disabled="disabled"></textarea>
            </div>
            <div class="form-group">
              <label for="board_file">첨부 이미지</label>
              <img :src="boardImage" width="100%"/>						
            </div>
            <div class="form-group">
              <div class="text-right">
                <router-link to="/board" class="btn btn-primary">목록보기</router-link>
                <router-link to="/boardmodify" class="btn btn-info">수정하기</router-link>
                <router-link to="/boarddelete" class="btn btn-danger">삭제하기</router-link>
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
      boardImage : '/images/logo.png'
    }
  }
}
</script>