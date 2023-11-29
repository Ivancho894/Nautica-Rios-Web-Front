import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  existsUsername,
  getProfilePhotoUrl,
  getUserPublicProfile,
} from "../../../firebase-config";

const PublicProfileView = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const params = useParams();

  const [profile, setProfile] = useState(null);
  const [url, seturl] = useState("");
  const [state, setState] = useState(0);
  useEffect(() => {
    getProfile();
    async function getProfile() {
      const username = params.username;
      try {
        const userUid = await existsUsername(username);
        console.log(userUid);
        if (userUid) {
          const userInfo = await getUserPublicProfile(userUid);
          setProfile(userInfo);
          console.log(profile);
          console.log(userInfo);
          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          console.log(userInfo.profileInfo.profilePicture);
          console.log(url);
          seturl(url);
        } else {
          setState(7);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [params]);
  if (state === 7) {
    return <div>User name doesn't exist</div>;
  }
  return (
    <div>
      <div>
        <img src={url} />
      </div>
      <h2>{profile?.profileInfo.username}</h2>
      <h3>{profile?.profileInfo.displayName}</h3>
      <div>posts</div>
    </div>
  );
};
export default PublicProfileView;
