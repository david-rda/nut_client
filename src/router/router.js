import { createRouter, createWebHistory } from "vue-router";

// კომპონენტები
import Signin from "../views/Signin.vue";
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
import StatementEdit from "../views/statement/Edit.vue";
import MyReport from "../views/statement/Reports.vue";
import ResetMain from "../views/password/Main.vue";
import ResetComponent from "../views/password/Reset.vue";
import NotFound from "../views/error/NotFound.vue";

const routes = [
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
    {
        path: "/",
        component: Signin
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
    {
        path: "/statement/edit/:id",
        component: StatementEdit
    },
    {
        path: "/statement/reports",
        component: MyReport
    },
    {
        path: "/reset/main",
        component: ResetMain
    },
    {
        path: "/reset/:token/:email",
        component: ResetComponent
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;