import React, { useEffect, useState } from "react";
import Header from "../../components/layout/header/Header";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import * as M from "./MyPageStyle";
import ProfileIcon from "../../assets/images/mongleProfileIcon.png"
import SideBar from "../../components/sidebar/SideBar.jsx";

const MyPage = ({ isLoggedIn }) => {
	const [profile, setProfile] = useState(ProfileIcon);
	const [recentViews, setRecentViews] = useState([]);
	const [myWorks, setMyWorks] = useState([]);
	const [likedWorks, setLikedWorks] = useState([]);
	const [showRecentViewsPage, setShowRecentViewsPage] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	// const getActiveLinkStyle = (path) => {
	// 	return location.pathname === path
	// 		? { fontWeight: "bold", color: "#121212" }
	// 		: { color: "#999" };
	// };

	const onClickLogout = () => {
		navigate("/");
		alert("로그아웃 되었습니다.");
	};

	useEffect(() => {
		const token = localStorage.getItem("token");

		axios.get("http://3.36.64.165:5000/users/me", {
			headers: {
				Authorization: `Bearer ${token}`
				// Authorization: Bearer <JWT 토큰>
			}
		}).then(res => {
			console.log("Server response:", res.data);
			setProfile(res.data.profile);
			setRecentViews(res.data.recent_views || []);
			setMyWorks(res.data.my_works || []);
			setLikedWorks(res.data.liked_works || []);
		}).catch(err => {
			console.error(err);
		});
	}, []);

	return (
		<>
			<Header isLoggedIn={isLoggedIn} onLoginClick={() => navigate("/")} />
			<SideBar 
				// getActiveLinkStyle={getActiveLinkStyle} 
				onClickLogout={onClickLogout} 
			/>
			<M.Wrapper>
				<M.ProfileContainer>
					<div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px", position: "relative" }}>
						{/* <div style={{ width: "84px", height: "84px", borderRadius: "50%", backgroundColor: "#DDD" }}></div> */}
						<img src={ProfileIcon} alt="프로필사진" style={{ width: "84px", height: "84px", borderRadius: "50%", backgroundColor: "#DDD" }}></img>
						<div style={{ marginLeft: "28px" }}>
							<div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{profile.username}</div>
							<div style={{ fontSize: "18px", color: "#6B7280" }}>{profile.name}</div>
						</div>
						<button
							style={{
								position: "absolute",
								right: "20px",
								backgroundColor: "#F3F3F3",
								color: "#6B7280",
								border: "none",
								padding: "10px",
								textAlign: "center",
								borderRadius: "12px",
								width: "104px",
								height: "37px",
								fontSize: "14px",
								fontWeight: "bold",
								cursor: "pointer",
							}}
						>
							프로필 수정
						</button>
					</div>
				</M.ProfileContainer>
				<M.RecentViewsContainer>
					<div style={{ display: "flex", width: "700px", flexDirection: "row" }}>
						<span style={{ fontWeight: "bold", fontSize: "18px" }}>최근 본 작품</span>
						<span
							style={{
								position: "absolute",
								right: "30px",
								cursor: "pointer",
							}}
							onClick={() => setShowRecentViewsPage(true)}
						> &gt; </span>
					</div>
					<M.RecentViewsList>
						{recentViews.map((item) => (
							<div key={item.id} style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
								<div style={{ width: "136px", height: "187px", backgroundColor: "#CCC" }}>
									<img src={item.image} alt={item.title} style={{ width: "136px", height: "187px", objectFit: "cover" }} />
								</div>
								<div style={{ marginTop: "10px" }}>
									<p style={{ margin: "4px 0" }}>무료연재</p>
									<p style={{ margin: "4px 0", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "120px" }}>
										{item.title}
									</p>
									<p style={{ margin: "4px 0", color: "#666" }}>{item.author_name}</p>
								</div>
							</div>
						))}
					</M.RecentViewsList>
				</M.RecentViewsContainer>

				{/* <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
										<div style={{ width: "136px", height: "187px", backgroundColor: "#CCC" }}></div>
										<div style={{ marginTop: "10px" }}>
											<p style={{ margin: "4px 0" }}>무료연재</p>
											<p style={{ margin: "4px 0", fontWeight: "bold" }}>누가 나를 죽였나</p>
											<p style={{ margin: "4px 0", color: "#666" }}>하성진</p>
										</div>
									</div>
									<div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
										<div style={{ width: "136px", height: "187px", backgroundColor: "#CCC" }}></div>
										<div style={{ marginTop: "10px" }}>
											<p style={{ margin: "4px 0" }}>무료연재</p>
											<p style={{ margin: "4px 0", fontWeight: "bold" }}>누가 나를 죽였나</p>
											<p style={{ margin: "4px 0", color: "#666" }}>하성진</p>
										</div>
									</div>
									<div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
										<div style={{ width: "136px", height: "187px", backgroundColor: "#CCC" }}></div>
										<div style={{ marginTop: "10px" }}>
											<p style={{ margin: "4px 0" }}>무료연재</p>
											<p style={{ margin: "4px 0", fontWeight: "bold" }}>누가 나를 죽였나</p>
											<p style={{ margin: "4px 0", color: "#666" }}>하성진</p>
										</div>
									</div>
									<div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
										<div style={{ width: "136px", height: "187px", backgroundColor: "#CCC" }}></div>
										<div style={{ marginTop: "10px" }}>
											<p style={{ margin: "4px 0" }}>무료연재</p>
											<p style={{ margin: "4px 0", fontWeight: "bold" }}>누가 나를 죽였나</p>
											<p style={{ margin: "4px 0", color: "#666" }}>하성진</p>
										</div>
									</div>
									<div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
										<div style={{ width: "136px", height: "187px", backgroundColor: "#CCC" }}></div>
										<div style={{ marginTop: "10px" }}>
											<p style={{ margin: "4px 0" }}>무료연재</p>
											<p style={{ margin: "4px 0", fontWeight: "bold" }}>누가 나를 죽였나</p>
											<p style={{ margin: "4px 0", color: "#666" }}>하성진</p>
										</div>
									</div>
									<div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
										<div style={{ width: "136px", height: "187px", backgroundColor: "#CCC" }}></div>
										<div style={{ marginTop: "10px" }}>
											<p style={{ margin: "4px 0" }}>무료연재</p>
											<p style={{ margin: "4px 0", fontWeight: "bold" }}>누가 나를 죽였나</p>
											<p style={{ margin: "4px 0", color: "#666" }}>하성진</p>
										</div>
									</div> */}

				{/* <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
				    <div style={{ fontWeight: "bold", fontSize: "18px" }}>최근 본 작품</div>
				    <span>&gt;</span>
				  </div>
				  <label style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
				    <div style={{ width: "136px", height: "187px", backgroundColor: "#CCC" }}></div>
				    <div style={{ marginTop: "10px", textAlign: "center" }}>
				      <p style={{ margin: "4px 0" }}>무료연재</p>
				      <p style={{ margin: "4px 0", fontWeight: "bold" }}>누가 나를 죽였나</p>
				      <p style={{ margin: "4px 0", color: "#666" }}>하성진</p>
				    </div>
				  </label> */}
				{/* <div style={{ marginTop: "10px", textAlign: "center" }}>
									<p style={{ margin: "4px 0" }}>무료연재</p>
									<p style={{ margin: "4px 0", fontWeight: "bold" }}>누가 나를 죽였나</p>
									<p style={{ margin: "4px 0", color: "#666" }}>하성진</p>
								</div>
							</label>
						</M.RecentViewsContainer> */}


				{/* <div style={{ padding: "20px" }}> */}
				{/*	<h2>내 작품 목록</h2>
				{myWorks.length === 0 ? (
					<p>작성한 작품이 없습니다.</p>
				) : (
					<div style={{ display: "flex", gap: "10px" }}>
						{myWorks.map((item) => (
							<div key={item.id}>
								<img src={item.image} alt={item.title} width="100" />
								<p>{item.title}</p>
								<p>{item.category}</p>
								<p>좋아요 {item.likes} · 조회수 {item.views}</p>
							</div>
						))}
					</div>
				)}

				<h2>좋아요 누른 작품</h2>
				{likedWorks.length === 0 ? (
					<p>좋아요 누른 작품이 없습니다.</p>
				) : (
					<div style={{ display: "flex", gap: "10px" }}>
						{likedWorks.map((item) => (
							<div key={item.id}>
								<img src={item.image} alt={item.title} width="100" />
								<p>{item.title}</p>
								<p>{item.author_name}</p>
							</div>
						))}
					</div>
				)}
			</div> */}
				{/* {myWorks.map(work => (
                <WorkCard
                    key={work.id}
                    title={work.title}
                    image={work.image}
                    category={work.category}
                    likes={work.likes}
                    views={work.views}
                />
            ))} */}
			</M.Wrapper>
		</>
	);
};

export default MyPage;