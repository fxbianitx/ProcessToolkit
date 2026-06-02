export type NavItem = {
    label: string;
    href: string;
    icon?: 'home' | 'rules' | 'audit' | 'docs' | 'settings';
    badge?: string;
};