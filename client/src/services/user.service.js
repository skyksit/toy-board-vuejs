// import axios from './axios';

// class UserService {
//   update(user) {
//     return axios
//       .patch(`/api/user/${user.id}`, {
//         user: {
//           id: user.id,
//           password: user.password
//         }
//       })
//       .then(res => {
//         if (res.data.accessToken) {
//           localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
//           axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
//         }
//         return res.data;
//       });
//   }
// }

// export default new UserService();