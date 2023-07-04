import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TourCard from "./TourCard";
import { useEffect } from "react";
import { Typography, Row, Col, Button, Spin } from "antd";
import axios from "axios";

const HomePage = () => {
	// Accessing Data

	const user = useSelector((state) => state.user);
	console.log(user);
	const navigate = useNavigate();

	const [tours, setTours] = useState(null);

	useEffect(() => {
		if (!user?.user?.payload) {
			navigate("/login");
		}

		const fetchTours = async () => {
			try {
				const res = await axios.get("http://localhost:3002/tours");
				console.log(res);
				setTours(res.data.data.tours);
			} catch (err) {
				console.log(err);
			}

			// console.log(res.data.data.tours)
		};

		fetchTours();
	}, [user, navigate]);

	if (!tours) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "80vh",
				}}>
				<Spin tip="Loading..." size={"large"}></Spin>
			</div>
		);
	}

	return (
		<div
			style={{
				padding: "20px",
			}}>
			<NavBar />
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "row",
				}}>
				<Typography.Title level={1}>
					Here are some tours you might like👋
				</Typography.Title>

				<Button
					type="primary"
					size="large"
					onClick={() => navigate("/posttour")}>
					Post a Tour
				</Button>
			</div>

			<Row
				span={24}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#f0f2f5",
				}}>
				{tours.map((tour) => (
					<Col span={6} style={{ padding: "20px" }}>
						<TourCard tour={tour} />
					</Col>
				))}
			</Row>
		</div>
	);
};

export default HomePage;
