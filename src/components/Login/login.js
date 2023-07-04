import React from "react";
import { Form, Row, Col, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user";
import axios from "axios";

const Login = () => {
	const [form] = Form.useForm(); // which can be used to make forms
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useDispatch();
	// for routing
	const navigate = useNavigate();

	// Validator Password Length
	const validatePasswordLength = (_, value) => {
		if (value && value.length < 8) {
			return Promise.reject("Password must be at least 8 characters");
		}
		return Promise.resolve();
	};

	// Signup Button Handler
	const submitHandler = async (values) => {
		// TODO: API CALL to my Server (Add a new user in Data for it's account)
		console.log(values);

		//apical
		const res = await axios.post("http://localhost:3002/users/login", {
			email: values.email,
			password: values.password,
		});

		if (res.data.status === "success") {
			// Timer
			setTimeout(() => {
				messageApi.open({
					type: "success",
					content: "Login Completed Successfullyy!",
				});
			}, 2000);

			console.log(res);
			// Dispatching Action for login
			dispatch(login(res.data.user));

			// Move Login
			navigate("/");
		} else {
			messageApi.open({
				type: "error",
				content: "Something went wrong!",
			});
		}
	};
	return (
		<div>
			{contextHolder}
			<Row
				style={{
					minHeight: "100vh",
				}}>
				<Col
					xs={0}
					md={12}
					lg={12}
					style={{
						backgroundColor: "#487eb0",
						textAlign: "center",
						paddingTop: "150px",
					}}>
					<img
						src={require("../../img/login.png")}
						alt="Image"
						// width="400px"
						// height="400px"
					/>
				</Col>
				<Col
					xs={24}
					md={12}
					lg={12}
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: "10px",
						padding: "20px",
					}}>
					<Typography.Text style={{ fontSize: "30px" }}>
						Login to <strong>Your</strong> Account
					</Typography.Text>
					<Form
						form={form}
						onFinish={submitHandler}
						layout="vertical"
						autoComplete="on"
						style={{
							width: "100%",
						}}>
						{/* Email of User */}
						<Form.Item
							name="email"
							label="Email"
							rules={[{ required: true, message: "Please input your Email" }]}>
							<Input />
						</Form.Item>

						{/* Password */}
						<Form.Item
							name="password"
							label="Password"
							type="password"
							rules={[
								{ required: true, message: "Please input your Password" },
								{
									validator: validatePasswordLength,
								},
							]}>
							<Input type="password" />
						</Form.Item>

						<Form.Item>
							<Button
								style={{ height: "2.5rem", width: "100%" }}
								size="small"
								type="primary"
								htmlType="submit">
								Login
							</Button>
						</Form.Item>
					</Form>

					{/* Data */}
					<Typography.Text>
						Don't Have an Account?{" "}
						<a href="/signup" style={{ fontWeight: 700 }}>
							Signup
						</a>
					</Typography.Text>
				</Col>
			</Row>
		</div>
	);
};

export default Login;
