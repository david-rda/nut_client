import { createRouter, createWebHistory } from "vue-router";

// კომპონენტები
import LoginPanel from "../views/LoginPanel.vue";
import SignUp from "../views/Signup.vue";
import DashBoard from "../views/Dashboard.vue";
import Settings from "../views/Settings.vue";
import UsersGrid from "../views/user/Users.vue";
import UserAdd from "../views/user/UserAdd.vue";
import UserEdit from "../views/user/UserEdit.vue";
import AddProduct from "../views/products/Add.vue";
import EditProduct from "../views/products/Edit.vue";
import ProductList from "../views/products/List.vue";
import Statements from "../views/statement/List.vue";
import StatementAdd from "../views/statement/Add.vue";
import StatementRead from "../views/statement/Read.vue";

const routes = [
    {
        path: "/",
        component: LoginPanel
    },
    {
        path: "/signup",
        component: SignUp
    },
    {
        path: "/home",
        component: DashBoard
    },
    {
        path: "/settings",
        component: Settings
    },
    {
        path: "/manage/user",
        component: UsersGrid
    },
    {
        path: "/user/add",
        component: UserAdd
    },
    {
        path: "/user/edit/:id",
        component: UserEdit
    },
    {
        path: "/product/add",
        component: AddProduct
    },
    {
        path: "/product/edit/:id",
        component: EditProduct
    },
    {
        path: "/product/list",
        component: ProductList
    },
    {
        path: "/statements",
        component: Statements
    },
    {
        path: "/statement/add",
        component: StatementAdd
    },
    {
        path: "/statement/read/:id",
        component: StatementRead
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;