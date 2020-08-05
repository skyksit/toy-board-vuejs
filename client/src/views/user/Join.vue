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
                <div class="form-group">
                  <label for="name">이름</label>
                  <ValidationProvider rules="required|min:2" v-slot="{ errors }">
                    <input
                      id="name"
                      ref="name"
                      v-model="user.name"
                      type="text"
                      class="form-control"
                      placeholder="홍길동"
                    />
                    <div v-if="errors[0]" class="alert alert-danger">{{ errors[0] }}</div>
                  </ValidationProvider>
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
                            placeholder="abcdef"
                            @keydown="resetCheckuserid"
                          />
                        <div class="input-group-append">
                          <button
                            type="button"
                            class="btn btn-primary"
                            @click="checkuseridExist"
                          >
                            중복확인
                          </button>
                        </div>
                      </div>
                      <div v-if="errors[0]" class="alert alert-danger">{{ errors[0] }}</div>
                    </ValidationProvider>
                  <div
                    v-if="messages.useridMsg"
                    class="alert"
                    :class="this.checkid ? 'alert-success' : 'alert-danger'"
                  >{{messages.useridMsg}}</div>
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
                        placeholder="password"
                      />
                    <div class="alert-danger">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <ValidationProvider rules="required|confirmed:password" v-slot="{ errors }">
                      <label for="password2">비밀번호 확인</label>
                      <input
                        id="password2"
                        ref="password2"
                        v-model="password2"
                        type="password"
                        class="form-control"
                      />
                      <div class="alert-danger">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                <div
                  v-if="messages.submitMsg"
                  class="alert"
                  :class="successful ? 'alert-success' : 'alert-danger'"
                >{{messages.submitMsg}}</div>
                <div class="form-group">
                  <div class="text-right">
                    <button
                      type="submit"
                      class="btn btn-primary"
                    >
                      회원가입
                    </button>
                  </div>
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
      user: new User('','password',''),
      checkid: false,
      successful: false,
      password2: 'password',
      messages: {
        useridMsg: '',
        submitMsg: ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', [
      'getLoggedin'
    ])
  },
  mounted() {
    if(this.getLoggedin) {
      this.$router.push({ name: 'Login'});
    }
  },
  methods : {
    ...mapActions('auth', [
      'register',
      'caniUseId'
    ]),
    onSubmit : function() {
      this.$refs.form.validate().then(success => {
        if(!success ) {
          this.messages.submitMsg = '입력 값이 잘 못 되었습니다. 확인해주세요.';
          return;
        }
        if(!this.checkid) {
          this.messages.useridMsg = '아이디 중복을 확인해주세요';
          return;
        }

        try {
          this.register( this.user ).then(
            data => {
              this.messages.submitMsg = data.message;
              this.successful = true;
              alert('가입해주셔서 감사합니다. 로그인 해주세요.');
              this.$router.push({ name: 'Login' });
            },
            error => {
              this.messages.submitMsg = 
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        } catch (err) {
          console.error(err);
        }

      });


    },
    checkuseridExist : async function() {
      try {
        let caniUseIdResult = await this.caniUseId( this.user.id );
        if (caniUseIdResult) {
          this.checkid = true;
          this.messages.useridMsg = '사용 가능한 아이디 입니다';
        } else {
          this.checkid = false;
          this.messages.useridMsg = '사용 불가능한 아이디 입니다';
          this.$refs.userid.focus();
        }
      } catch (err) {
        console.error(err);
      }
    },
    resetCheckuserid : function() {
      this.checkid = false;
      this.messages.useridMsg = '';
    }
  }
}
</script>