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
              <label for="userName">이름</label>
              <input
                id="userName"
                ref="userName"
                v-model="userName"
                type="text"
                class="form-control"
                disabled="disabled"
              >
            </div>
            <div class="form-group">
              <label for="userId">아이디</label>
              <input
                id="userId"
                ref="userId"
                v-model="userId"
                type="text"
                class="form-control"
                disabled="disabled"
              >
            </div>
            <div class="form-group">
              <label for="userPassword">비밀번호</label>
              <input
                id="userPassword"
                ref="userPassword"
                v-model="userPassword"
                type="password"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="userPassword2">비밀번호 확인</label>
              <input
                id="userPassword2"
                ref="userPassword2"
                v-model="userPassword2"
                type="password"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <div class="text-right">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="checkInput"
                >
                  정보수정
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
  data : function() {
    return {
      userName : "",
      userId : "",
      userPassword : "",
      userPassword2 : ""
    }
  },
  methods : {
    checkInput : function() {
      if(this.userPassword.length < 6) {
        alert("비밀번호는 6글자 이상입니다");
        this.userPassword = '';
        this.$refs.userPassword.focus();
      }
      if(this.userPassword != this.userPassword2) {
        alert("비밀번호 확인 입력값이 비밀번호 입력값과 다릅니다");
        this.$refs.userPassword2.focus();
      }
    }
  }
}
</script>