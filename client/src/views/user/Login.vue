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
            <ValidationObserver ref="form">
              <form @submit.prevent="onSubmit">
                <div
                  v-if="user.isLoginFail === true"
                  class="alert alert-danger"
                >
                <h3>로그인 실패</h3>
                <p>아이디 비밀번호를 확인해주세요</p>
                </div>
                <div class="form-group">
                  <label for="userid">아이디</label>
                  <ValidationProvider :rules="{ required: {allowFalse:false} , regex: /^[A-Za-z0-9]{4,12}$/ }" v-slot="{ errors }">
                    <div class="input-group">
                      <input
                        id="userid"
                        ref="userid"
                        v-model="user.id"
                        type="text"
                        class="form-control"
                      >
                    </div>
                    <div v-if="errors[0]" class="alert alert-danger">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <ValidationProvider rules="required|alpha_dash|min:4" v-slot="{ errors }" vid="password">
                  <label for="password">비밀번호</label>
                  <input
                    id="password"
                    ref="password"
                    v-model="user.password"
                    type="password"
                    class="form-control"
                  >
                  <div class="alert-danger">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div
                  v-if="messages.submitMsg"
                  class="alert"
                  :class="successful ? 'alert-success' : 'alert-danger'"
                >{{messages.submitMsg}}</div>
                <div class="form-group text-right">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="onSubmit"
                  >
                    <span>로그인</span>
                  </button>
                  <router-link
                    to="/user/join"
                    class="btn btn-danger"
                  >
                    회원가입
                  </router-link>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
      <div class="col-sm-3" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import User from '../../models/user';

export default {
  data : function() {
    return {
      user: new User('','',''),
      successful: false,
      messages: {
        submitMsg: ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', [
      'getLoggedin'
    ])
  },
  created() {
    if (this.getLoggedin) {
      this.$router.push({ name: 'Home'});
    }
  },
  methods : {
    ...mapActions('auth', [
      'login'
    ]),
    onSubmit : function() {
      this.successful = true;

      try {
        this.login( this.user ).then(
          data => {
            if(!data) {
              this.successful = false;
              this.messages.submitMsg = "로그인을 실패하였습니다";
              return;
            }
            this.$router.replace(this.$route.query.redirect || '/');
          },
          error => {
            this.successful = false;
            this.messages.submitMsg = error.data.message;
          }
        );
        this.successful = false;
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>