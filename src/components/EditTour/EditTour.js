import {
	Form,
	Input,
	InputNumber,
	Button,
	Typography,
	Row,
	Col,
	Select,
	message,
} from "antd";
import axios from "axios";
import React from "react";

const { Title } = Typography;
const { Option } = Select;

const EditTour = ({ tour, closeModal }) => {
	const onFinish = async (values) => {
		console.log(values);

		try {
			const res = await axios.patch(
				`http://localhost:3002/tours/${tour._id}`,
				values
			);

			console.log(res);
			message.success("Tour updated successfully");

			closeModal();
		} catch (err) {
			console.log(err);
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
			<Title level={2}>Edit Tour</Title>
			<Form
				layout="vertical"
				onFinish={onFinish}
				initialValues={{
					name: tour.name,
					price: tour.price,
					duration: tour.duration,
					category: tour.category,
					description: tour.description,
				}}>
				<Col span={24}>
					<Form.Item
						label="Name"
						name="name"
						rules={[{ required: true, message: "Please enter the tour name" }]}>
						<Input defaultValue={tour.name} />
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
							<InputNumber
								style={{ width: "100%" }}
								defaultValue={tour.price}
							/>
						</Form.Item>
					</Col>

					<Col span={8}>
						<Form.Item
							label="Duration"
							name="duration"
							rules={[
								{ required: true, message: "Please enter the tour duration" },
							]}>
							<InputNumber
								style={{ width: "100%" }}
								defaultValue={tour.duration}
							/>
						</Form.Item>
					</Col>

					<Col span={8}>
						<Form.Item
							label="Category"
							name="category"
							rules={[
								{ required: true, message: "Please select the tour category" },
							]}>
							<Select
								placeholder="Select category"
								defaultValue={tour.category}>
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
					<Input.TextArea defaultValue={tour.description} />
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{ height: "2.5rem", width: "100%" }}>
						Edit Tour
					</Button>
				</Form.Item>
			</Form>
		</Row>
	);
};

export default EditTour;
