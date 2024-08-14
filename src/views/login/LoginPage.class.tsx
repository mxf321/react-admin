import React from 'react'
import styles from './LoginPage.module.css'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { connect } from 'react-redux'
import { login } from '@/redux/user/slice'
import { ErrorPage, Loading } from '@/components'
import { AppDispatch, RootState } from '@/redux'
import { WithTranslation, withTranslation } from 'react-i18next'
import { withRouter, IRoutedProps } from '@/utils/withRouter'

type FieldType = {
    username?: string
    password?: string
    remember?: string
}

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.user.loading,
        error: state.user.error,
        token: state.user.token
    }
}
const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        loginData: ({ username, password }) => {
            dispatch(login({ username, password }))
        }
    }
}

type PropsType = WithTranslation &
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    IRoutedProps

class Login extends React.Component<PropsType> {
    render(): React.ReactNode {
        // t WithTranslation withTranslation() 为 react-i18next 的 api
        // const { t, token, loading, error, navigate } = this.props
        const { token, loading, error, navigate } = this.props
        const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
            this.props.loginData({
                username: values.username,
                password: values.password
            })
        }

        if (loading) {
            return <Loading />
        }
        if (error) {
            return <ErrorPage error={error} />
        }
        if (token) {
            navigate('/')
        }
        return (
            <div className={styles['register-form']}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ minWidth: 450, maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        initialValue="super-admin"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        initialValue="123456"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const LoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(withRouter(Login)))
export default LoginPage
