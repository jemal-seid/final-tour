import {
	Form,
	Input,
	InputNumber,
	Button,
	Typography,
	Row,
	Col,
	message,
	Upload,
	Select,
} from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const PostTour = ({ onCreate }) => {
	const [form] = Form.useForm(); // which can be used to make forms
	const [messageApi, contextHolder] = message.useMessage();
	// for routing
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

	const onFinish = async (values) => {
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

		// call api
		const res = await axios.post("http://localhost:3002/tours", values, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		console.log(res);
		if (res.status === 200) {
			setTimeout(() => {
				message.open({
					type: "success",
					content: "Tour Created Successfully!",
				});
			}, 1000);

			// redirect to home page
			navigate("/");
		} else {
			message.open({
				type: "error",
				content: "Something went wrong!",
			});
		}
	};

	return (
		<Row
			style={{
				display: "flex",
				justifyContent: "space-between",
				flexDirection: "column",
				margin: "20px 50px",
				padding: "40px",
				border: "1px solid #e0e0e0",
				borderRadius: "5px",
				boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
			}}>
			{contextHolder}
			<Title level={2}>Create New Tour</Title>

			<Form layout="vertical" onFinish={onFinish} form={form}>
				{/* Name of User */}
				<div style={{ textAlign: "center", marginBottom: "1rem" }}>
					<ImgCrop rotate>
						<Upload
							listType="picture-card"
							fileList={fileList}
							onChange={onImgChange}
							onPreview={onPreview}
							beforeUpload={() => false}>
							{fileList.length < 1 && "+ Tour Image"}
						</Upload>
					</ImgCrop>
				</div>
				<Col span={24}>
					<Form.Item
						label="Name"
						name="name"
						rules={[{ required: true, message: "Please enter the tour name" }]}>
						<Input />
					</Form.Item>
				</Col>

				<Row gutter={16}>
					<Col span={8}>
						<Form.Item
							label="Price"
							name="price"
							rules={[
								{ required: true, message: "Please enter the tour price" },
							]}>
							<InputNumber style={{ width: "100%" }} />
						</Form.Item>
					</Col>

					<Col span={8}>
						<Form.Item
							label="Duration"
							name="duration"
							rules={[
								{ required: true, message: "Please enter the tour duration" },
							]}>
							<InputNumber style={{ width: "100%" }} />
						</Form.Item>
					</Col>

					<Col span={8}>
						<Form.Item
							label="Category"
							name="category"
							rules={[
								{ required: true, message: "Please select the tour category" },
							]}>
							<Select placeholder="Select category">
								<Option value="Nature">Nature</Option>
								<Option value="Adventure">Adventure</Option>
								<Option value="Ocean">Ocean</Option>
								<Option value="Forest">Forest</Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item
					label="Description"
					name="description"
					rules={[
						{ required: true, message: "Please enter the tour description" },
					]}>
					<Input.TextArea />
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{ height: "2.5rem", width: "100%" }}>
						Create
					</Button>
				</Form.Item>
			</Form>
		</Row>
	);
};

export default PostTour;
