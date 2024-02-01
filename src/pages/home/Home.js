import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
// import {apartment1, apartment2, apartment3, apartment4, apartment5, dorm6, hotel1, hotel2, hotel3, hotel4, hotel5, dorm1, dorm2, dorm3, dorm4, dorm5} from "../../assets/images";
import LoadingScreenPage from "../../atoms/loadingScreenPage/LoadingScreenPage";
import {
	NavBar,
	Banner,
	Footer,
	ApartmentCarousel,
	Multilayerfilter,
	CardListing,
	DormCarousel,
	HotelsCarousel,
} from "../../organisms";
import { Row, Button } from "react-bootstrap";
import config from "../../config";
import { notFound, searching } from "../../assets/images";
const url = config.apiUrl;

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [queries, setQueries] = useState(null);
	const [report, setReport] = useState("");
	const [searched, setSearched] = useState(false);
	const toggleSearched = () => setSearched(true);
	const [topApartments, setTopApartments] = useState([]);
	const [topDorms, setTopDorms] = useState([]);
	const [topHotels, setTopHotels] = useState([]);
	useEffect(() => {
		setLoading(true);
		const fetchData = async (type) => {
			try {
				const response = await axios.post(
					url + "/get-top-five-accommodations",
					{ type }
				);
				return response.data.accommodation;
			} catch (error) {
				console.error(error);
				return [];
			}
		};

		Promise.all([
			fetchData("Dorm"),
			fetchData("Apartment"),
			fetchData("Hotel"),
		]).then(([dorms, apartments, hotels]) => {
			// console.log("Dorms", dorms[0]);
			// console.log("Hotels", hotels);
			setTopDorms(dorms);
			setTopApartments(apartments);
			setTopHotels(hotels);
			setLoading(false);
		});
	}, []);
	// useEffect(() => {
	//   // Initially did three categories, but for beta testing we will use a general top five
	//   // [""].map((type) => {
	//   setLoading(true);
	//   axios
	//     .post(url + "/get-top-five-accommodations", { type: "" })
	//     .then((res) => {
	//       const topAccoms = res.data.accommodation;
	//       setTopApartments(topAccoms);
	//       setLoading(false);

	//       // if (topAccoms) {
	//       //   const type = topAccoms[0].ACCOMMODATION_TYPE;
	//       //   if (type === "Apartment") {
	//       //     setTopApartments(topAccoms);
	//       //   } else if (type === "Dorm") {
	//       //     setTopDorms(topAccoms);
	//       //   } else if (type === "Hotel") {
	//       //     setTopHotels(topAccoms);
	//       //   }
	//       //   setLoading(false);
	//       // }
	//     })
	//     .catch((err) => {
	//       console.log(
	//         `Attempted to query ${url + "/get-top-five-accommodations"}`
	//       );
	//       console.error(err);
	//     });
	//   // });
	// }, []);

	const generateReports = () => {
		const blob = new Blob([report], { type: "application/pdf" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "report.pdf";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const handleQuery = (queries, filters) => {
		setQueries(queries);
		axios
			.post(
				url + "/generate-report",
				{ filters: filters },
				{ responseType: "arraybuffer" }
			)
			.then((res) => {
				console.log("Generating report link");
				setReport(res.data);
			})

			.catch((err) => console.log(err));

		console.log("passed up successfully");
	};

	return (
		<div className="home-container">
			<NavBar />
			{loading ? (
				<div className="centeredSpinner">
					<LoadingScreenPage size={80} color={"#4f4a47"} loading={loading} />
				</div>
			) : (
				<div>
					<Banner />
					<Multilayerfilter
						toggleSearched={toggleSearched}
						handleQuery={handleQuery}
					/>
					{queries ? (
						<div className="reports-btn">
							<Button className="carousel-btn" onClick={generateReports}>
								{" "}
								Download 📥{" "}
							</Button>
						</div>
					) : (
						<></>
					)}
					{searched ? (
						<div
							className="searched-list"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							{/* <div className="reports-btn"> */}
							{/* </div> */}
							{queries ? (
								queries.map((query, index) =>
									query.ACCOMMODATION_ISARCHIVED === 0 ? (
										<CardListing
											key={index}
											unit={query}
											name={query.ACCOMMODATION_NAME}
											location={query.ACCOMMODATION_LOCATION}
											description={query.ACCOMMODATION_DESCRIPTION}
											amenities={query.ACCOMMODATION_AMENITIES}
											address={query.ACCOMMODATION_ADDRESS}
											max_price={query.max_price}
											owner={query.USER_FNAME + " " + query.USER_LNAME}
											owner_username={query.USER_USERNAME}
											rating={query.rating}
										/>
									) : (
										<></>
									)
								)
							) : queries === null ? (
								<div className="noResultsContainer">
									<img className="Searching" src={searching} alt="searching" />
									<p className="header4 noResultText">Searching...</p>
								</div>
							) : (
								<div className="noResultsContainer">
									<img
										className="NotFound"
										src={notFound}
										alt="no results found"
									/>
									<p className="header4 noResultText">No Results Found</p>
								</div>
							)}
						</div>
					) : (
						<div className="home-carousel-list">
							<ApartmentCarousel topApartments={topApartments} />
							<DormCarousel topDorms={topDorms} />
							<HotelsCarousel topHotels={topHotels} />
							{/* <DormCarousel topDorms={topDorms} />
              <HotelsCarousel topHotels={topHotels} /> */}
						</div>
					)}
				</div>
			)}

			<Footer />
		</div>
	);
};

export default Home;
