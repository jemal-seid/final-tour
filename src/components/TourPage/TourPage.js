import React, { useState, useEffect } from "react";
import {
	Row,
	Button,
	Typography,
	Space,
	Popconfirm,
	Modal,
	message,
	Spin,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditTour from "../EditTour/EditTour";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

const IndividualTourPage = ({ onDelete, onEdit }) => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [tour, setTour] = useState(null);

	useEffect(() => {
		const fetchTour = async () => {
			try {
				const res = await axios.get(`http://localhost:3002/tours/${id}`);
				console.log(res);
				setTour(res.data.data.tours);
			} catch (err) {
				console.log(err);
			}
		};

		fetchTour();
	}, [id]);

	const deleteTour = async (tour) => {
		try {
			const res = await axios.delete(`http://localhost:3002/tours/${tour._id}`);
			console.log(res);

			message.success("Tour deleted successfully");

			navigate("/");
		} catch (err) {
			console.log(err);
			message.error("Something went wrong");
		}
	};

	const [visible, setVisible] = useState(false);

	if (!tour) {
		return (
			<Spin
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "80vh",
				}}
				tip="Loading..."
				size={"large"}></Spin>
		);
	}
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",

				flexDirection: "column",
				margin: "20px",
				padding: "50px",
			}}>
			{/* Tour Title and buttons */}
			<Row
				span={24}
				style={{ display: "flex", justifyContent: "space-between" }}>
				<Title level={1}>{tour.name}</Title>
				<Space>
					<Button
						type="primary"
						icon={<EditOutlined />}
						onClick={() => setVisible(true)}>
						Edit
					</Button>

					<Popconfirm
						title="Are you sure you want to delete this tour?"
						onConfirm={() => onDelete(tour)}
						okText="Yes"
						cancelText="No">
						<Button
							type="primary"
							danger
							icon={<DeleteOutlined />}
							onClick={() => deleteTour(tour)}>
							Delete
						</Button>
					</Popconfirm>
				</Space>
			</Row>

			{/* Image */}
			<img
				src={`data:image/png;base64,${tour.photo}`}
				alt="Tour"
				style={{ width: "50%", height: "50%" }}
			/>

			{/* Tour Details */}
			<Title level={5}>Description:</Title>
			<Text>{tour.description}</Text>
			<br />
			<Title level={5}>Details:</Title>
			<Text>Price: {tour.price}</Text>
			<br />
			<Text>Duration: {tour.duration} days</Text>
			<br />
			<Text>Category: {tour.category}</Text>
			<br />
			<Text>User: {tour.user}</Text>

			{/* Modal 
        with no footer
      */}
			<Modal
				visible={visible}
				onCancel={() => setVisible(false)}
				footer={null}
				P>
				<EditTour tour={tour} closeModal={() => setVisible(false)} />
			</Modal>
		</div>
	);
};

export default IndividualTourPage;
