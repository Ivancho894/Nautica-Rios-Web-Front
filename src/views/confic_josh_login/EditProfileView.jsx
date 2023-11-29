import AuthProvider from "../../components/AuthProvider";
import DashboardWrapper from "../../components/Paginas/DashboardWrapper";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

import {
  getProfilePhotoUrl,
  setUserProfilePhoto,
  updateUser,
} from "../../../firebase-config";
const EditProfileView = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [profileUrl, setProfileUrl] = useState(null);
  const fileRef = useRef(null);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);
    setState(2);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoogedIn() {
    navigate("login");
  }
  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }
  function handleChangeFile(e) {
    const files = e.target.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.results;
        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        console.log("....");
        console.log(res.metadata.fullPath);
        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setProfileUrl(url);
        }
      };
    }
  }
  if (state !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoogedIn={handleUserNotLoogedIn}
        onUserNotRegistered={handleUserNotRegistered}
      ></AuthProvider>
    );
  }
  return (
    <DashboardWrapper>
      <div>
        <h2>Edit profile info</h2>
        <div>
          <div>
            <img
              src={profileUrl}
              alt="no se puedo abrir la imagen"
              width={100}
            />
          </div>
          <div>
            <button onClick={handleOpenFilePicker}>
              Choose new profile picture
            </button>
            <input
              ref={fileRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleChangeFile}
            />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default EditProfileView;
