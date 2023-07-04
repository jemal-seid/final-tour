import React from "react";
import { Typography, Divider, Space } from "antd";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const ProfilePage = () => {
	const user = useSelector((state) => state.user.user.payload);
	return (
		<div
			style={{
				margin: "20px 60px",
				padding: "20px",
				border: "1px solid #e6e6e6",
				borderRadius: "10px",
				boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
			}}>
			{/* Image */}

			<img
				src={`data:image/jpeg;base64,${user.photo}`}
				style={{
					width: "200px",
					height: "200px",
					borderRadius: "50%",
					objectFit: "cover",
					marginBottom: "20px",
				}}
			/>
			<Title level={3}>{user.name}</Title>
			<Text>Joined on 1st January 2020</Text>
			<Text style={{ display: "block" }}>Age: {user.age}</Text>
			<br />
			<br />

			<Divider />

			<div>
				<Title level={4}>Contact Information</Title>
				<Space direction="vertical">
					<Text>Email: {user.email}</Text>
				</Space>
			</div>

			<div style={{ marginBottom: 24 }}>
				<Title level={4}>About Me</Title>
				<Text>{user.aboutMe}</Text>
			</div>
		</div>
	);
};

export default ProfilePage;
