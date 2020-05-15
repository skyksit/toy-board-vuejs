<template>
  <div
    class="container"
    style="margin-top:100px"
  >
    <div class="card shadow">
      <div class="card-body">
        <h4 class="card-title">
          게시판 이름
        </h4>
        <table
          id="board_list"
          class="table table-hover"
        >
          <thead>
            <tr>
              <th
                scope="col"
                class="text-center d-none d-md-table-cell"
              >
                글번호
              </th>
              <th
                scope="col"
                class="w-50"
              >
                제목
              </th>
              <th
                scope="col"
                class="text-center d-none d-md-table-cell"
              >
                작성자
              </th>
              <th
                scope="col"
                class="text-center d-none d-md-table-cell"
              >
                작성날짜
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="a1 in tempList"
              :key="a1"
              @click="goRead"
            >
              <td class="text-center d-none d-md-table-cell">
                {{ a1 }}
              </td>
              <td>글 제목 입니다</td>
              <td class="text-center d-none d-md-table-cell">
                홍길동
              </td>
              <td class="text-center d-none d-md-table-cell">
                2018-12-12
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="d-none d-md-block">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <router-link
                to="/board"
                class="page-link"
              >
                이전
              </router-link>
            </li>
            <li
              v-for="a1 in tempList"
              :key="a1"
              class="page-item"
            >
              <router-link
                to="/board"
                class="page-link"
              >
                {{ a1 }}
              </router-link>
            </li>
            <li class="page-item">
              <router-link
                to="/board"
                class="page-link"
              >
                다음
              </router-link>
            </li>
          </ul>
        </div>
        
        <div class="d-block d-md-none">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a
                href="#"
                class="page-link"
              >이전</a>
            </li>
            <li class="page-item">
              <a
                href="#"
                class="page-link"
              >다음</a>
            </li>
          </ul>
        </div>
        
        <div class="text-right">
          <router-link
            to="/boardwrite"
            class="btn btn-primary"
          >
            글쓰기
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'BoardMain',
  data : function() {
    return {
      tempList : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods : {
    goRead : function() {
      this.$router.push('/boardview');
    }
  }
}
</script>