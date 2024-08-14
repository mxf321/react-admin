import React from 'react'
import styles from './LoginPage.module.css'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/user/slice'
import { useSelector } from '@/redux/hooks'
import { ErrorPage, Loading } from '@/components'
import { AppDispatch } from '@/redux'

type FieldType = {
    username?: string
    password?: string
    remember?: string
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state) => state.user.loading)
    const error = useSelector((state) => state.user.error)
    const token = useSelector((state) => state.user.token)

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        dispatch(
            login({
                username: values.username,
                password: values.password
            })
        )
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
export default LoginPage
