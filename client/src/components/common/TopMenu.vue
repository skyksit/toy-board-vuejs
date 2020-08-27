<template>
  <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top shadow-lg">
    <router-link to="/" class="navbar-brand">Toy Project</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMenu">
      <span class="navbar-toggler-icon"></span>        
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav">
        <li class="nav-item" v-for='(obj, index) in boardList' :key="index">
          <router-link :to="'/board/' + obj.sk" class="nav-link">{{obj.content}}</router-link>
        </li>
      </ul>
      
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="currentLogin">
          <router-link to="/user/modify" class="nav-link">정보수정</router-link>
        </li>
        <li class="nav-item" v-if="currentLogin">
          <a class="nav-link" href @click.prevent="logoutProcess">
            <font-awesome-icon icon="sign-out-alt" />로그아웃
          </a>
        </li>
        <li class="nav-item" v-if="!currentLogin">
          <router-link to="/user/login" class="nav-link">로그인</router-link>
        </li>
        <li class="nav-item" v-if="!currentLogin">
          <router-link to="/user/join" class="nav-link">회원가입</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapActions } from 'vuex';
import { getStore, setStore } from '@/utils';
import { getBoardList } from '@/api/board';

export default {
  name: 'Topmenu',
  data() {
    return {
      boardList: []
    }
  },
  computed: {
    currentLogin : function () {
      return this.$store.state.user.loggedIn;
    }
  },
  methods: {
    ...mapActions('user', [
      'logout'
    ]),
    logoutProcess() {
      this.logout();
      alert('로그아웃 되었습니다');
      this.$router.push({name: 'Home'}).catch(()=>{});
    },
    initBoardList() {
      //localstorage 에서 게시판리스트를 가져온다
      let localBoardList = getStore('boardList');
      if (localBoardList) {
        console.log(`getStore.success`);
        this.boardList = JSON.parse(localBoardList);
        return;
      }
      //localstorage 에 게시판리스트가 없으면 api 를 통해서 가져온다
      console.log(`getStore.failed`);
      getBoardList().then(
        response => {
          let { data } = response;
          this.boardList = data;
          setStore('boardList', data);
        },
        error => {
          console.log(`error=${JSON.stringify(error)}`);
        }
      );
      //게시판리스트는 data.boardList 에 넣는다
    }
  },
  created() {
    this.initBoardList();
  }
}
</script>