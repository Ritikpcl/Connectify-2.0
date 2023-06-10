import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";
import ReactLoading from 'react-loading';

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const { data } = await getAllUser();
          setPersons(data);
          setLoading(false); 
      } catch (error) {
        console.error("Failed to fetch persons:", error);
          setLoading(false);
      }
    };

    fetchPersons();

  }, [user]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <ReactLoading type={"bars"} color="#fff" />
  </div> 
  }

  return (
    <div className={location === "modal" ? "modal-div" : ""}>

      <hr />
      <h3 className="listHeading">People you may know</h3>
      <div className="FollowersCard">
        {persons.map((person, id) => {
          if (person._id !== user._id) return <User person={person} key={id} />;
        })}

        {!location && persons.length > 3 ? (
          <span className="showMore" onClick={() => setModalOpened(true)}>
            Show more
          </span>
        ) : (
          ""
        )}

        <FollowersModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
      </div>
    </div>
  );
};

export default FollowersCard;
