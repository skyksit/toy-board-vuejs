<template>
  <div class="container" style="margin-top:100px">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="card shadow">
          <div class="card-body">
              <div class="form-group">
                <label for="userName">이름</label>
                <input type="text" id="userName" ref="userName" v-model="userName" class="form-control"/>
              </div>
              <div class="form-group">
                <label for="userId">아이디</label>
                <div class="input-group">
                  <input type="text" id="userId" ref="userId" v-model="userId" class="form-control"/>
                  <div class="input-group-append">
                    <button type="button" @click="checkUserIdExist" class="btn btn-primary">중복확인</button>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="userPassword">비밀번호</label>
                <input type="password" id="userPassword" ref="userPassword" v-model="userPassword" class="form-control"/>
              </div>
              <div class="form-group">
                <label for="userPassword2">비밀번호 확인</label>
                <input type="password" id="userPassword2" ref="userPassword2" v-model="userPassword2" class="form-control"/>
              </div>
              <div class="form-group">
                <div class="text-right">
                  <button type="button" @click="checkInput"  class="btn btn-primary">회원가입</button>
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
  data : function() {
    return {
      userName : '',
      userId : '',
      userPassword : '',
      userPassword2 : '',
      checkUserId : false
    }
  },
  methods : {
    checkInput : function() {
      if(this.userName.length < 2) {
        alert("이름은 2글자 이상입니다");
        this.userName = '';
        this.$refs.userName.focus();
        return
      }
      if(this.userId.length < 4) {
        alert("아이디는 4글자 이상입니다");
        this.userId = '';
        this.$refs.userId.focus();
        return
      }
      if(this.userPassword.length < 4) {
        alert("비밀번호는 6글자 이상입니다");
        this.userPassword = '';
        this.$refs.userPassword.focus();
        return
      }
      if(this.userPassword != this.userPassword2) {
        alert("비밀번호 확인 입력값이 비밀번호 입력값과 다릅니다");
        this.$refs.userPassword2.focus();
        return
      }
      if(this.checkUserId === false) {
        alert('아이디 중복 확인을 해주세요');
        this.$refs.userId.focus();
        return
      }
      alert("가입이 완료되었습니다");
      this.$router.push('/user/login');
    },
    checkUserIdExist : function() {
      this.checkUserId = true;
    }
  }
}
</script>