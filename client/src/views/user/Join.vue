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
              <label for="username">이름</label>
              <input
                id="username"
                ref="username"
                v-model="user.username"
                type="text"
                class="form-control"
                placeholder="홍길동"
              />
            </div>
            <div>
              <b-alert show :variant="message.name.color" v-model="message.name.show" v-html="message.name.html" dismissible></b-alert>
            </div>
            <div class="form-group">
              <label for="userid">아이디</label>
              <div class="input-group">
                <input
                  id="userid"
                  ref="userid"
                  v-model="user.userid"
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
              <div>
                <b-alert show :variant="message.id.color" v-model="message.id.show" v-html="message.id.html" dismissible></b-alert>
              </div>
            </div>
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input
                id="password"
                ref="password"
                v-model="user.password"
                type="password"
                class="form-control"
                placeholder="password"
              />
            </div>
            <div class="form-group">
              <label for="password2">비밀번호 확인</label>
              <input
                id="password2"
                ref="password2"
                v-model="password2"
                type="password"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <div class="text-right">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="addUser"
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
import { mapActions } from 'vuex';
import User from '../../models/user';

export default {
  data : function() {
    return {
      user: new User('','password',''),
      checkid: false,
      successful: false,
      password2: 'password',
      msg: '',
      message: {
        name : {
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
    ...mapActions(['register','caniUseId']),
    addUser : function() {
      if(this.user.username.length < 2) {
        this.message.name.html = '이름은 2글자 이상입니다';
        this.message.name.show = true;
        this.$refs.username.focus();
        return
      } else {
        this.message.name.show = false;
      }
      if(this.user.userid.length < 4) {
        this.message.id.html = '아이디는 4글자 이상입니다';
        this.message.id.show = true;
        this.message.id.color = 'danger';
        this.$refs.userid.focus();
        return
      } else {
        this.message.idMsg = false;
      }
      if(this.user.password.length < 6) {
        alert("비밀번호는 6글자 이상입니다");
        this.$refs.password.focus();
        return
      }
      if(this.user.password != this.password2) {
        alert("비밀번호 확인 입력값이 비밀번호 입력값과 다릅니다");
        this.$refs.password2.focus();
        return
      }
      if(this.user.checkid === false) {
        this.message.id.html = '아이디 중복 확인을 해주세요';
        this.message.id.show = true;
        this.$refs.userid.focus();
        return
      }

      try {
        let registerResult = this.register( this.user );
        console.log(`JOIN.vue = ${JSON.stringify(registerResult)}`);
      } catch (err) {
        console.error(err);
      }
    },
    checkuseridExist : async function() {
      if(this.user.userid.length < 4) {
        this.message.id.html = "아이디는 4글자 이상입니다";
        this.message.id.show = true;
        this.message.id.color = 'danger';
        this.$refs.userid.focus();
        return
      }
      try {
        let caniUseIdResult = await this.caniUseId( this.user.userid );
        this.message.showIdMsg = true;
        if (caniUseIdResult) {
          this.user.checkid = true;
          this.message.id.html = "사용 가능한 아이디 입니다";
          this.message.id.show = true;
          this.message.id.color = 'success';
        } else {
          this.user.checkid = false;
          this.message.id.html = "사용할 수 없는 아이디 입니다.<br/> 다른 아이디를 입력해주세요";
          this.message.id.show = true;
          this.message.id.color = 'danger';
          this.$refs.userid.focus();
        }
      } catch (err) {
        console.error(err);
      }
    },
    resetCheckuserid : function() {
      this.user.checkid = false;
    }
  }
}
</script>