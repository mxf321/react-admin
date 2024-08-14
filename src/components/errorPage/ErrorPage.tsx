import { Empty } from "antd"
type PropsType = {
    error: any;
};

export const ErrorPage: React.FC<PropsType> = ({ error }) => {
    return (
        <Empty description={`网站出错 ：${error}`} />
    )
}