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
              <label for="name">이름</label>
              <input
                id="name"
                ref="name"
                v-model="user.name"
                type="text"
                class="form-control"
                disabled="disabled"
              >
            </div>
            <div class="form-group">
              <label for="userid">아이디</label>
              <input
                id="userid"
                ref="userid"
                v-model="user.id"
                type="text"
                class="form-control"
                disabled="disabled"
              >
            </div>
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input
                id="password"
                ref="password"
                v-model="user.password"
                type="password"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="password2">비밀번호 확인</label>
              <input
                id="password2"
                ref="password2"
                v-model="password2"
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
import { mapGetters } from 'vuex';
import User from '../../models/user';

export default {
  data : function() {
    return {
      user : new User('','',''),
      successful: false,
      password2: '',
      messages: {
        submitMsg: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  created: function() {
    this.user = new User(this.getUser.id, '', this.getUser.name);
    console.log(`created.user = ${JSON.stringify(this.user)}`);
    console.log(`created.this.getUser = ${JSON.stringify(this.getUser)}`);
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