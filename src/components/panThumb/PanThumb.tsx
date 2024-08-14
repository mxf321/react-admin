import styles from './PanThumb.module.scss'
interface PropsType {
    image: string;
    role?: string;
    height: string;
    width: string;
    zIndex?: string | number;
    children?: any
}

export const PanThumb: React.FC<PropsType> = ({ image, role, height, width, zIndex, children }) => {
    return (
        <div
            className={styles['pan-item']}
            style={{ zIndex: zIndex, height: height, width: width }}
        >
            <div className={styles['pan-info']}>
                <div className={styles['pan-info-roles-container']}>
                    <div>Hello</div>
                    <div>{role}</div>
                    <div>{children}</div>
                </div>
            </div>
            <div
                style={{ backgroundImage: `url(${image})` }}
                className={styles['pan-thumb']}
            ></div>
        </div>
    )
}
