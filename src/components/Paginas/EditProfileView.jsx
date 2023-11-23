import AuthProvider from "../AuthProvider";
import DashboardWrapper from "./DashboardWrapper";
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
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState(0);
  const [profileUrl, setProfileUrl] = useState(undefined);
  const fileRef = useRef(null);

  function handleUserLoggedIn(user) {
    setCurrentUser(user);
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
          setCurrentUser({ ...tmpUser });
          await updateUser(tmpUser);
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
            {profileUrl}
            <img src={profileUrl} alt="" width={100} />
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
