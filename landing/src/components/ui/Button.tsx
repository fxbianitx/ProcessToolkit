import styles from '../../styles/ui.module.css';
import clsx from 'clsx';

type Props = {
    href: string;
    children: React.ReactNode;
    primary?: boolean;
};

export default function Button({ href, children, primary }: Props) {
    return (
        <a
            href={href}
            className={clsx(styles.button, primary ? styles.primary : styles.secondary)}
        >
            {children}
        </a>
    );
}
