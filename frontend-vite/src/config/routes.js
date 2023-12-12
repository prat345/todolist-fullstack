import TodoList from "../pages/TodoList";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

const components = {
  todoList: {
    url: "/todo-list",
    component: TodoList,
  },
  login: {
    url: "/login",
    component: Login,
  },
  Profile: {
    url: "/profile",
    component: Profile,
  },
  register: {
    url: "/register",
    component: Register,
  },
};

// Role ไหนเข้าหน้าไหนได้
export default {
  guest: {
    allowedRoutes: [components.login, components.register],
    redirectRoutes: "/login",
  },
  user: {
    allowedRoutes: [components.todo, components.profile],
    redirectRoutes: "/profile",
  },
};
