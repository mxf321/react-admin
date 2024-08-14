import { Spin } from "antd"

export const Loading: React.FC = () => {
    return (
        <Spin
            size="large"
            style={{
                marginTop: 200,
                marginBottom: 200,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
            }}
        />
    )
}