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
            <div
              v-if="user.isLoginFail === true"
              class="alert alert-danger"
            >
              <h3>로그인 실패</h3>
              <p>아이디 비밀번호를 확인해주세요</p>
            </div>
            <form
              action="index.html"
              method="post"
              onsubmit="return check_input()"
            >
              <div class="form-group">
                <label for="userid">아이디</label>
                <input
                  id="userid"
                  ref="userid"
                  v-model="user.userid"
                  type="text"
                  class="form-control"
                >
              </div>
              <div>
                <b-alert show :variant="message.id.color" v-model="message.id.show" v-html="message.id.html" dismissible></b-alert>
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
              <div>
                <b-alert show :variant="message.password.color" v-model="message.password.show" v-html="message.password.html" dismissible></b-alert>
              </div>
              <div class="form-group text-right">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="onSubmit"
                >
                  로그인
                </button>
                <router-link
                  to="/user/join"
                  class="btn btn-danger"
                >
                  회원가입
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-sm-3" />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import User from '../../models/user';

export default {
  data : function() {
    return {
      user: new User('','',''),
      loading: false,
      msg: '',
      message: {
        password : {
          color : 'danger',
          show : false,
          html : ''
        },
        id : {
          color : 'danger',
          show : false,
          html : ''
        }
      }
    }
  },
  methods : {
    ...mapActions(['login']),
    onSubmit : function() {
      if(this.user.userid.length < 4) {
        this.message.id.html = '아이디는 4글자 이상입니다';
        this.message.id.show = true;
        this.$refs.userid.focus();
        return
      } else {
        this.message.id.show = false;
      }
      if(this.user.password.length < 4) {
        this.message.password.html = '비밀번호는 6글자 이상입니다';
        this.message.password.show = true;
        this.$refs.password.focus();
        return
      } else {
        this.message.password.show = false;
      }

      try {
        let loginResult = this.login( this.user );
        console.log(loginResult); //로그인이 성공이면 true, 실패면 false
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>