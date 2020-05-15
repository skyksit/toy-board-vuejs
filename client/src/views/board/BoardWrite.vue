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
              <label for="boardImage">첨부 이미지</label>
              <input
                id="boardImage"
                type="file"
                name="boardImage"
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
                  작성하기
                </button>
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
      boardSubject : '',
      boardContent : '',
      boardImage : ''
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
      alert('Saved');
      this.$router.push('/board');
    }
  }
}
</script>