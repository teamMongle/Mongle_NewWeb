import * as M from "./DraftPostStyle";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layout/header/Header";
import SideBar from "../../components/sidebar/SideBar";

const DraftPost = ({ isLoggedIn, noteIds }) => {
  const { note_id } = useParams();
  const [myNoteIds, setMyNoteIds] = useState([]);
  const [draftEpisodes, setDraftEpisodes] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const token = localStorage.getItem("token");
    const myWokrs = async () => {
      try {
        const response = await axios.get(`http://3.39.231.73:5000/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        console.log("myworks", response.data.myWorks)
        const noteIds = response.data.myWorks.map(work => work.id);
        setMyNoteIds(noteIds);
      } catch (err) {
        console.error(err);
      }
    }

    const postDraft = async (noteIds) => {
      try {
        const token = localStorage.getItem("token");
        const allDrafts = [];
        // const response = await axios.get(
        //   `http://3.36.64.165:5000/drafts/notes/${note_id}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        // console.log("에피소드 조회 성공:", response.data);
        for (let id of noteIds) {
          const response = await axios.get(
            `http://3.36.64.165:5000/drafts/notes/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          allDrafts.push({ noteId: id, data: response.data });
        }

        setDraftEpisodes(allDrafts);
        console.log("draftEpisodes", draftEpisodes);
      } catch (err) {
        console.error("에피소드 조회 에러:", err);
      }
    };

    // myWokrs();
    // postDraft();

    myWokrs().then(() => {
      if (myNoteIds.length > 0) {
        postDraft(myNoteIds);
      }
    });
  }, []);



  return (
    <>
      <Header title={"임시저장"} isLoggedIn={isLoggedIn} />
      <SideBar />
      {/* <div style={{ padding: "20px" }}> */}
      <M.DraftWrapper>
        <M.DraftTitle>임시 저장</M.DraftTitle>
        <M.DraftCount>총 {draftEpisodes.length}개</M.DraftCount>
        {draftEpisodes.map((draft, index) => (
          // <div key={index} style={{ marginBottom: "20px", border: "1px solid gray", padding: "10px" }}>
          //   <h3>Note ID: {draft.noteId}</h3>
          //   <pre>{JSON.stringify(draft.data, null, 2)}</pre>
          // </div>
          <M.DraftItem key={index}>
            <M.DraftInfo>
              <M.DraftIndex>{draft.data.number}화</M.DraftIndex>
              <M.DraftTitleText>{draft.data.title}</M.DraftTitleText>
              <M.DraftDate>{draft.data.created_at || "2025.03.21"}</M.DraftDate>
            </M.DraftInfo>
            <M.TrashIcon>🗑️</M.TrashIcon>
          </M.DraftItem>
        ))}
        {/* </div> */}
      </M.DraftWrapper>
    </>
  )
}

export default DraftPost;














// import * as M from "./DraftPostStyle";
// import { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import Header from "../../components/layout/header/Header";
// import SideBar from "../../components/sidebar/SideBar";

// const DraftPost = ({ isLoggedIn, noteIds }) => {
//   const { note_id } = useParams();
//   const [myNoteIds, setMyNoteIds] = useState([]);
//   const [draftEpisodes, setDraftEpisodes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     const fetchMyWorks = async () => {
//       try {
//         const response = await axios.get(`http://3.39.231.73:5000/users/me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("myWorks response", response.data.myWorks);
//         const noteIds = response.data.myWorks.map((work) => work.id);
//         setMyNoteIds(noteIds);

//         // fetch draft episodes after setting noteIds
//         const allDrafts = [];
//         for (let id of noteIds) {
//           try {
//             const draftRes = await axios.get(
//               `http://3.36.64.165:5000/drafts/notes/${id}`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//             allDrafts.push({ noteId: id, data: draftRes.data });
//           } catch (err) {
//             console.error(`Error fetching draft for noteId ${id}:`, err);
//           }
//         }
//         setDraftEpisodes(allDrafts);
//       } catch (err) {
//         console.error("Error fetching myWorks:", err);
//       }
//     };

//     fetchMyWorks();
//   }, []);

//   return (
//     <>
//       <Header title={"임시저장"} isLoggedIn={isLoggedIn} />
//       <SideBar />
//       <div style={{ padding: "20px" }}>
//         {draftEpisodes.map((draft, index) => (
//           <div key={index} style={{ marginBottom: "20px", border: "1px solid gray", padding: "10px" }}>
//             <h3>Note ID: {draft.noteId}</h3>
//             <pre>{JSON.stringify(draft.data, null, 2)}</pre>
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }

// export default DraftPost;