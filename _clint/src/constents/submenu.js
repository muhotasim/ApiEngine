const menu = [
    {
        link: "/Dashboard",
        label: "Dashboard",
        icon: "fa fa-dashboard",
        menus: []
    },
    {
        link: "/",
        label: "Products",
        icon: "fa fa-product-hunt",
        menus: [
            {
                link: "/AddProduct",
                label: "Add Product",
                icon: "",
            },
            {
                link: "/ProductList",
                label: "Product List",
                icon: "",
            }
        ]
    },
    {
        link: "/CategoryList",
        label: "Category",
        icon: "fa fa-list-alt",
        menus: []

    },
    {
        link: "/Users",
        label: "Users Management",
        icon: "fa fa-users",
        menus: [
            {
                link: "/Users",
                label: "Users",
                icon: "",
                menus: []
            },
            {
                link: "/Users/Create",
                label: "Users Create",
                icon: "",
                menus: []
            },
            {
                link: "/Users/Role",
                label: "Roles",
                icon: "",
                menus: []
            },
            {
                link: "/Users/Permissions",
                label: "Permissions",
                icon: "",
                menus: []
            }
        ]
    },
    {
        link: "/Order",
        label: "Orders",
        icon: "fa fa-cart-plus",
        menus: [
            {
                link: "/OrderList",
                label: "Order List",
                icon: "",
                menus: []
            },
            {
                link: "/Order/Create",
                label: "Create Order",
                icon: "",
                menus: []
            }
        ]
    },
    {
        link: "/Content",
        label: "Content",
        icon: "fa fa-tag",
        menus: []
    },
    {
        link: "/Galeary",
        label: "Galeary",
        icon: "fa fa-picture-o",
        menus: []
    },
    {
        link: "/Reports",
        label: "Reports",
        icon: "fa fa-bar-chart",
        menus: []
    },
];
export default menu;