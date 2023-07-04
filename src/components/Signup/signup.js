import React, { useState } from "react";
import {
	Form,
	Row,
	Col,
	Input,
	Button,
	Typography,
	message,
	Upload,
} from "antd";
import { useNavigate } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import axios from "axios";

const Signup = () => {
	const [form] = Form.useForm(); // which can be used to make forms
	const [messageApi, contextHolder] = message.useMessage();
	// for routing
	const navigate = useNavigate();

	const [fileList, setFileList] = useState([]);

	// Image Uploading via Model Logic
	const onImgChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};
	const onPreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};

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
		// check for file list
		if (fileList.length === 0) {
			messageApi.open({
				type: "error",
				content: "Please Upload a Profile Picture!",
			});
			return;
		}

		values.photo = fileList[0].originFileObj;

		console.log(values);

		const res = await axios.post("http://localhost:3002/users/signup", values, {
			headers: {
				"Content-Type": "multipart/form-data",
				"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
			},
		});
		console.log(res);
		if (res.data.status === "success") {
			// Timer
			setTimeout(() => {
				messageApi.open({
					type: "success",
					content: "Signup Completed Successfullyy!",
				});
			}, 2000);

			navigate("/login");
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
						backgroundColor: "#273c75",
					}}>
					{/* <img
						src={require("../../img/vegan.jpg")}
						alt="Image"
						width="600px"
						height="600px"
					/> */}
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
						backgroundColor: "#8c7ae6",
					}}>
					<Typography.Text style={{ fontSize: "30px" }}>
						Create <strong>Your</strong> Account
					</Typography.Text>
					<Form
						form={form}
						onFinish={submitHandler}
						layout="vertical"
						autoComplete="on"
						style={{
							width: "100%",
						}}>
						{/* Name of User */}
						<div style={{ textAlign: "center", marginBottom: "1rem" }}>
							<ImgCrop rotate>
								<Upload
									listType="picture-card"
									fileList={fileList}
									onChange={onImgChange}
									onPreview={onPreview}
									beforeUpload={() => false}>
									{fileList.length < 1 && "+ Profile"}
								</Upload>
							</ImgCrop>
						</div>

						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="name"
									label="Name"
									rules={[
										{ required: true, message: "Please input your Name" },
									]}>
									<Input />
								</Form.Item>
							</Col>

							<Col span={12}>
								{/* Email of User */}
								<Form.Item
									name="email"
									label="Email"
									rules={[
										{ required: true, message: "Please input your Email" },
									]}>
									<Input />
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="phoneNo"
									label="Phone No"
									rules={[
										{ required: true, message: "Please input your Phone No" },
									]}>
									<Input />
								</Form.Item>
							</Col>

							<Col span={12}>
								{/* Age */}
								<Form.Item
									name="age"
									label="Age"
									rules={[
										{ required: true, message: "Please input your Age" },
									]}>
									<Input />
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="password"
									label="Password"
									rules={[
										{ required: true, message: "Please input your Password" },
										{
											validator: validatePasswordLength,
										},
									]}>
									<Input />
								</Form.Item>
							</Col>
							{/* Confirm Password */}
							<Col span={12}>
								<Form.Item
									name="passwordConfirm"
									label="Confirm Password"
									rules={[
										{
											required: true,
											message: "Please input your Confirm Password",
										},
										{
											validator: validatePasswordLength,
										},
									]}>
									<Input />
								</Form.Item>
							</Col>
						</Row>

						{/* About Me */}
						<Form.Item
							name="aboutMe"
							label="About Me"
							rules={[
								{ required: true, message: "Please input your About Me" },
							]}>
							<Input.TextArea />
						</Form.Item>

						<Form.Item>
							<Button
								style={{
									height: "2.5rem",
									width: "100%",
									backgroundColor: "#273c75",
									color: "white",
									borderRadius: "10px",
									border: "none",
								}}
								size="small"
								htmlType="submit">
								Signup
							</Button>
						</Form.Item>
					</Form>

					{/* Data */}
					<Typography.Text>
						Already Have an Account?{" "}
						<a href="/login" style={{ fontWeight: 700 }}>
							Login
						</a>
					</Typography.Text>
				</Col>
			</Row>
		</div>
	);
};

export default Signup;
