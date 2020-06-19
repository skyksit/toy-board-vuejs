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
                placeholder="홍길동"
              />
            </div>
            <div>
              <b-alert show variant="danger" v-model="showNameMsg" v-html="nameMsg" dismissible></b-alert>
            </div>
            <div class="form-group">
              <label for="userId">아이디</label>
              <div class="input-group">
                <input
                  id="userId"
                  ref="userId"
                  v-model="userId"
                  type="text"
                  class="form-control"
                  placeholder="abcdef"
                  @keydown="resetCheckUserId"
                />
                <div class="input-group-append">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="checkUserIdExist"
                  >
                    중복확인
                  </button>
                </div>
              </div>
              <div
                class="card-body"
                v-html="idMsg"
              >
              </div>
            </div>
            <div class="form-group">
              <label for="userPassword">비밀번호</label>
              <input
                id="userPassword"
                ref="userPassword"
                v-model="userPassword"
                type="password"
                class="form-control"
                placeholder="password"
              />
            </div>
            <div class="form-group">
              <label for="userPassword2">비밀번호 확인</label>
              <input
                id="userPassword2"
                ref="userPassword2"
                v-model="userPassword2"
                type="password"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <div class="text-right">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="checkInput"
                >
                  회원가입
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
      user: {
        userName : '',
        userId : '',
        userPassword : '',
        userPassword2 : '',
        checkUserId : false
      },
      message: {
        nameMsg : '',
        idMsg : '',
        showNameMsg : false
      }
    }
  },
  methods : {
    checkInput : function() {
      if(this.userName.length < 2) {
        this.nameMsg = '이름은 2글자 이상입니다';
        this.showNameMsg = true;
        this.$refs.userName.focus();
        return
      } else {
        this.showNameMsg = false;
      }
      if(this.userId.length < 4) {
        this.idMsg = '아이디는 4글자 이상입니다';
        this.$refs.userId.focus();
        return
      }
      if(this.userPassword.length < 6) {
        alert("비밀번호는 6글자 이상입니다");
        this.$refs.userPassword.focus();
        return
      }
      if(this.userPassword != this.userPassword2) {
        alert("비밀번호 확인 입력값이 비밀번호 입력값과 다릅니다");
        this.$refs.userPassword2.focus();
        return
      }
      if(this.checkUserId === false) {
        this.idMsg = '아이디 중복 확인을 해주세요';
        this.$refs.userId.focus();
        return
      }
      alert("가입이 완료되었습니다");
      // this.$router.push('/user/login');
    },
    checkUserIdExist : function() {
      if(this.userId.length < 4) {
        this.idMsg = "아이디는 4글자 이상입니다";
        this.$refs.userId.focus();
        return
      }
      const baseURI = 'http://localhost:5000/local';
      this.$http
        .get(`${baseURI}/api/id?user_id=${this.userId}`)
        .then((result) => {
          if (result.data.use_id === true) {
            this.checkUserId = true;
            this.idMsg = "사용 가능한 아이디 입니다";
          } else {
            this.checkUserId = false;
            this.idMsg = "사용할 수 없는 아이디 입니다.<br/> 다른 아이디를 입력해주세요";
          }
        });
    },
    resetCheckUserId : function() {
      this.checkUserId = false;
    }
  }
}
</script>