import React, { useEffect, useState } from 'react';
import ChatRoom from './components/chatRoom';
import AuthService from '@/services/auth.service';
import { setUserInfo } from '@/redux/reducer/authReducer';
import NotificationService from '@/services/notification.service';
import { useDispatch } from 'react-redux';
import CustomModal from '@/components/ui/CustomModal';
import Loader from '@/components/ui/Loader';

function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true);
    try {
      AuthService
        .getUserViaAccessToken()
        .then((response) => {
          setLoading(false);
          if (response?.status) {
            dispatch(setUserInfo(response?.data));
          }
        })
        .catch((err) => { 
          NotificationService.error({
            message: "Error",
            addedText: "Could not fetch user data",
            position: "top-center",
          });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="mt-[8rem] rounded-[1rem] bg-sirp-secondary2 mx-5">
       {/* {loading && (
        <CustomModal
          style="w-full h-full  h-[100%] top-0 bottom-0"
          closeModal={() => setLoading(false)}
        >
          <div className="flex justify-center items-center mt-[10rem]">
            <Loader />
          </div>
        </CustomModal>
      )} */}
      <div>
        <ChatRoom/>
      </div>
    </div>
  );
}

export default Home;
