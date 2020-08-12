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
                <div class="form-group">
                  <ValidationProvider rules="required|confirmed:password" v-slot="{ errors }">
                    <label for="password2">비밀번호 확인</label>
                    <input
                      id="password2"
                      ref="password2"
                      v-model="password2"
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
                <div class="form-group">
                  <div class="text-right">
                    <button
                      type="submit"
                      class="btn btn-primary"
                    >
                      정보수정
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
      user : new User('','',''),
      successful: false,
      password2: '',
      messages: {
        submitMsg: ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', [
      'getUser'
    ])
  },
  created: function() {
    this.user = new User(this.getUser.id, '', this.getUser.name);
    // console.log(`created.user = ${JSON.stringify(this.user)}`);
    // console.log(`created.this.getUser = ${JSON.stringify(this.getUser)}`);
  },
  methods : {
    ...mapActions('auth', [
      'update'
    ]),
    onSubmit : function() {
      this.$refs.form.validate().then(success => {
        if(!success) {
          this.messages.submitMsg = '입력 값이 잘 못 되었습니다. 확인해주세요.';
          // return;
        }

        try {
          this.update( this.user ).then(
            data => {
              this.messages.submitMsg = data.message;
              this.successful = true;
              alert('비밀번호가 수정되었습니다');
              this.$router.push({ name: 'Home' });
            },
            error => {
              this.messages.submitMsg = error.data.message;
              this.successful = false;
              console.error(`error=${JSON.stringify(error)}`);
              console.error(`error.data.message=${JSON.stringify(error.data.message)}`);
            }
          );
        } catch (err) {
          console.error(`err=${err}`);
          console.error(`err.response= ${err.response}`);
        }
      });
    }
  }
}
</script>