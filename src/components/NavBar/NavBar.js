import { Col, Row, Typography, Button, Avatar, Image } from "antd";
import React from "react";
import { MailOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user";

const NavBar = () => {
	const user = useSelector((state) => state.user.user.payload);
	const dispatch = useDispatch();
	console.log(user);
	const navigate = useNavigate();
	return (
		<div>
			<Row
				span={24}
				className="flex-h"
				style={{
					backgroundColor: "white",
					width: "100%",
					color: "black",
					boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
				}}>
				<Col span={10}>
					<img src={require("../../img/logo.png")} />
				</Col>
				<Col
					span={14}
					className="flex-h"
					style={{ justifyContent: "space-between" }}>
					<ul className="flex-h" style={{ gap: "50px", fontSize: "20px" }}>
						<li
							onClick={() => {
								navigate("/");
							}}>
							Home
						</li>

						<li
							onClick={() => {
								navigate(`/profile/${user._id}`);
							}}>
							Profile
						</li>

						<li
							onClick={() => {
								navigate(`/users`);
							}}>
							Users
						</li>

						<li
							onClick={() => {
								dispatch(logout());
								navigate("/");
							}}>
							Logout
						</li>
					</ul>

					<ul className="flex-h" style={{ fontSize: "16px" }}>
						<Button
							style={{
								border: "none",
								backgroundColor: "#ffffff",
							}}>
							<Avatar
								style={{ backgroundColor: "#0000ff" }}
								icon={<MailOutlined />}
							/>
						</Button>
						<Button
							style={{
								border: "none",
								backgroundColor: "#ffffff",
							}}>
							<Avatar
								style={{ backgroundColor: "#0000ff" }}
								icon={<MessageOutlined />}
							/>
						</Button>
						<Button
							style={{
								border: "none",
								backgroundColor: "#ffffff",
							}}
							onClick={() => {
								navigate(`profile/${user._id}`);
							}}>
							<Avatar
								style={{ backgroundColor: "#0000ff" }}
								icon={<UserOutlined />}
							/>
						</Button>
					</ul>
				</Col>
			</Row>
		</div>
	);
};

export default NavBar;
