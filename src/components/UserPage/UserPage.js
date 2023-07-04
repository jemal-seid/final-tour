import { Card, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const { Title } = Typography;

const UsersPage = () => {
	const [users, setUsers] = useState(null);

	// api call
	useEffect(() => {
		const getUsers = async () => {
			const res = await axios.get("http://localhost:3002/users");
			console.log(res);
			setUsers(res.data.data.users);
		};

		getUsers();
	}, []);

	const navigate = useNavigate();

	if (!users) return <h1>Loading...</h1>;

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",

				flexDirection: "column",
				margin: "20px",
				padding: "20px",
			}}>
			<Title
				level={2}
				style={{
					textAlign: "center",
					color: "#1890ff",
				}}>
				Users List
			</Title>
			<Row gutter={[16, 16]}>
				{users.map((user) => (
					<Col xs={24} sm={12} lg={8} key={user.id}>
						<Card
							title={user.name}
							style={{ width: "100%" }}
							cover={
								<img
									src={`data:image/png;base64,${user.photo}`}
									alt="User Photo"
								/>
							}>
							<p>
								<strong>Age:</strong> {user.age}
							</p>
							<p>
								<strong>Email:</strong> {user.email}
							</p>
							<p>
								<strong>About Me:</strong> {user.aboutMe}
							</p>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default UsersPage;
