import { Card, Typography } from "antd";
import {
	EnvironmentOutlined,
	DollarOutlined,
	ClockCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Title, Text } = Typography;

const TourCard = ({ tour }) => {
	const navigate = useNavigate();

	return (
		<Card
			cover={<img src={`data:image/png;base64,${tour.photo}`} />}
			style={{ width: 300 }}
			actions={[
				<EnvironmentOutlined key="location" />,
				<DollarOutlined key="price" />,
				<ClockCircleOutlined key="duration" />,
			]}
			onClick={() => navigate(`/tour/${tour._id}`)}>
			<Meta
				title={tour.name}
				description={
					<>
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
					</>
				}
			/>
		</Card>
	);
};

export default TourCard;
