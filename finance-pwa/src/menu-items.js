export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'loans',
                    title: 'Loans',
                    type: 'item',
                    url: '/loans',
                    icon: 'feather icon-home',
                },
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-home',
                },
                {
                    id: 'signup-1',
                    title: 'Sign up',
                    type: 'item',
                    url: '/auth/signup-1',
                    breadcrumbs: false,
                    icon: 'feather icon-home',
                },
                {
                    id: 'signin-1',
                    title: 'Sign in',
                    type: 'item',
                    url: '/auth/signin-1',
                    breadcrumbs: false,
                    icon: 'feather icon-home',
                }
            ]
        },
    ]
}