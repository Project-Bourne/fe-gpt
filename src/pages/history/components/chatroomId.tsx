import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ChatService from '@/services/chat.service';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import NotificationService from '@/services/notification.service';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useSelector, useDispatch } from 'react-redux';
import { useTruncate } from '@/components/custom-hooks';
import TypewriterComponent from 'typewriter-effect';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AuthService from '@/services/auth.service';
import { setUserInfo } from '@/redux/reducer/authReducer';

function ChatRoomId() {
    const dispatch = useDispatch();
    const { userInfo, userAccessToken, refreshToken } = useSelector(
        (state: any) => state?.auth,
    );
    const userInitials = () => userInfo?.firstName?.[0] + userInfo?.lastName?.[0];
    const userName = useTruncate(userInfo?.firstName + " " + userInfo?.lastName, 14);
    const route = useRouter();
    const [formData, setFormData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { id } = route.query;
    const [fileName, setFileName] = useState('');
    const [chats, setChats] = useState([]);
    const boardRef = useRef(null);

    // Fetch user information
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await AuthService.getUserViaAccessToken();
                if (response?.status) {
                    dispatch(setUserInfo(response?.data));
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                NotificationService.error({
                    message: "Error",
                    addedText: "Could not fetch user data",
                    position: "top-center",
                });
            }
        };

        if (!userInfo) {
            fetchUserData();
        }
    }, [dispatch, userInfo]);

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData(value);
    };

    const fetchData =
        async () => {
            setIsLoading(true)
            try {
                const dataObj = {
                    message: formData,
                };
                const response = await ChatService.chat(id, dataObj);
                console.log(response);
                if (response.status) {
                    const newResponse = await ChatService.getChat(response.data.uuid);
                    console.log(newResponse, 'newResponse');
                    response.status && setChats(newResponse.data);
                    !response.status && NotificationService.error({
                        message: "Error!",
                        addedText: <p>{response.message}. please try again</p>,
                        position: 'bottom-right'
                    });
                } else {
                    NotificationService.error({
                        message: "Error!",
                        addedText: <p>{response.message}. please try again</p>,
                        position: 'bottom-right'
                    });
                    route.push('/history')
                }
                setFormData('')
                setIsLoading(false)
                scrollToBottom();

            } catch (error) {
                setIsLoading(false)
                NotificationService.error({
                    message: "Error!",
                    addedText: <p>Something went wrong. please try again</p>,
                    position: 'bottom-right'
                });
            }
        }

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth', // You can use 'auto' for instant scrolling
        });
    };

    useEffect(() => {
        if (!id) return
        ChatService.getChat(id).then((res) => setChats(res.data))
    }, [id])

    useEffect(() => {
        scrollToBottom();
        window.scrollTo(0, document.body.scrollHeight);
    }, [chats, isLoading]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (formData.length > 3) {
            await fetchData()
        }
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const selectedFile = event.target.files[0];
        const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
        const userId = userInfo.uuid
        if (!fullName || !userId || !selectedFile) return
        if (selectedFile) {
            setFileName(selectedFile.name)
            const formData = new FormData();
            formData.append('files', selectedFile);
            formData.append("userId", userId);
            formData.append("userName", fullName);
            try {
                const res = await fetch(
                    // 'http://192.81.213.226:81/89/api/v1/uploads', 
                    `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FILE_UPLOAD_API_ROUTE}/api/v1/uploads`,
                {
                    method: 'POST',
                    body: formData,
                });

                const response = await res.json();

                if (response) {
                    let pretext = `${response.data[0].text}`
                    const dataObj = {
                        message: pretext,
                    };
                    const res = await ChatService.chat(id, dataObj);
                    if (res.status) {
                        const newResponse = await ChatService.getChat(res.data.uuid);
                        console.log(newResponse, 'newResponse');
                        res.status && setChats(newResponse.data);
                        !res.status && NotificationService.error({
                            message: "Error!",
                            addedText: <p>{res.message}. please try again</p>,
                            position: 'bottom-right'
                        });
                    } else {
                        NotificationService.error({
                            message: "Error!",
                            addedText: <p>{res.message}. please try again</p>,
                            position: 'bottom-right'
                        });
                    }
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    // Handle error, e.g., display an error message
                    NotificationService.error({
                        message: "Error!",
                        addedText: <p>File failed to upload</p>,
                        position: 'top-right'
                    });
                    console.error('File upload failed');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                setIsLoading(false);
                NotificationService.error({
                    message: "Error!",
                    addedText: <p>An Error occured. please try again</p>,
                    position: 'bottom-right'
                });
            }

            setIsLoading(false);
        }
    };

    return (
        <div className="mt-[8rem] h-[100%] pb-5 rounded-[1rem] board relative bg-[#F9F9F9] mx-5" ref={boardRef}>
            {/* {isLoading && (
                <div className="fixed top-1 right-1 w-[40%] rounded-lg bg-sirp-primary p-2 text-center z-[30000]">
                    <CircularProgress style={{ color: 'white', marginRight: '10px' }} size={20} thickness={5} />
                    <p style={{ display: 'inline-block', color: 'white' }}>Deep Chat is thinking...</p>
                </div>
            )} */}
            <div className="border-b-2 pb-5 pt-5 px-2 flex items-center justify-between">
                <h1 className="text-2xl pl-3 pt-5 font-bold">Query Board</h1>
                <div className='flex items-center mb-3'>
                    {fileName && <span className='text-grey-400 text-sm text-sirp-primary ' onClick={() => setFileName('')}><RemoveCircleIcon style={{ color: '#4582C4', cursor: 'pointer' }} /></span>}
                    <span className='text-grey-400 ml-2 text-sm text-sirp-primary w-[150px]'>{useTruncate(fileName, 18)}</span>
                    <label htmlFor="file-input" className='px-4 py-1 rounded-lg' style={{ cursor: 'pointer', color: '#4582C4', backgroundColor: "white", border: '1px solid #4582C4' }}>
                        <DriveFolderUploadIcon style={{ color: '#4582C4', cursor: 'pointer' }} /> Upload File
                    </label>

                    <input
                        type="file"
                        id="file-input"
                        style={{ display: 'none' }}
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                    />
                </div>
            </div>
            <div className='mb-36'>
                {chats.map((message) => (
                    <div key={message.uuid} className=''>
                        <section className="rounded-[1rem] bg-sirp-accentBlue mx-5 mt-5">
                            <div className="flex justify-between w-full items-center px-5 border-b-2">
                                <div className="flex justify-start items-center gap-5 p-2">
                                    {/* <img
                                        src={userInfo?.image ?? userInitials()}
                                        alt="upload image"
                                        width={20}
                                        height={20}
                                        className="cursor-pointer rounded-full"
                                    /> */}
                                    <div className="h-[32px] w-[32px] aspect-square flex items-center justify-center rounded-full bg-sirp-primary">
                                        <p className="text-white text-[12px] font-extrabold">
                                            {userInitials()}
                                        </p>
                                    </div>
                                    <h1 className='capitalize font-semibold'> {userInfo?.firstName && userName}</h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 px-4 py-2">
                                {/* <span className="text-[14px] p-5 px-10 text-justify">
                                    {message.userQuestion}
                                </span> */}
                                <ReactMarkdown
                                    components={{
                                        p: ({ children }) => <p className='mb-4'>{ children }</p>
                                    }}
                                >
                                    { message.userQuestion }
                                </ReactMarkdown>
                            </div>
                        </section>
                        <section className=" mx-5 mt-5 shadow-sm">
                            <div className="flex justify-between w-full items-center px-5 border-b-4 border-l-4  border-sirp-accentBlue">
                                <div className="flex justify-start items-center gap-5 py-1">
                                    <Image
                                        src={require(`../../../../public/icons/oracleAvatar.svg`)}
                                        alt="upload image"
                                        width={30}
                                        height={20}
                                        priority
                                        className="cursor-pointer"
                                    />
                                    <h1 className="font-semibold"> Oracle Chat </h1>
                                </div>
                            </div>
                            <div className="">

                                {/* {message.aiAnswer.split('\n').map((paragraph, i) => (
                                    <p key={i} className="text-[14px] text-justify border-l-4  pl-10 pb-1 leading-8 border-sirp-accentBlue break-normal "> {paragraph} </p>
                                    // <div key={i} className="text-[14px] text-justify border-l-4  pl-10 pb-1 leading-8 border-sirp-accentBlue break-normal">
                                    //     <TypewriterComponent options={{ strings: paragraph, autoStart: true, delay: 5, loop: false }} />
                                    // </div>
                                ))} */}
                                <div className="text-[14px] text-justify border-l-4 pl-10 pb-1 leading-8 border-sirp-accentBlue break-normal">
                                    <ReactMarkdown 
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            p: ({ node, ...props }) => (
                                                <p className="text-[14px] text-justify border-l-4  pl-10 pb-1 leading-8 border-sirp-accentBlue break-normal" {...props} />
                                            )
                                        }}
                                    >
                                        {message.aiAnswer}
                                    </ReactMarkdown>
                                </div>

                            </div>
                        </section>
                    </div>
                ))}
                {isLoading && <div className='h-[60vh] flex items-center justify-center'>
                    <CircularProgress color="inherit" />
                </div>}

            </div>

            {/* oracle input section */}
            <div className="bg-white py-5 fixed mx-1 right-0 bottom-0 w-[80%] mt-5">
                <form onSubmit={handleFormSubmit} className="px-5">
                    <div className="flex align-middle align w-full border-2 bg-sirp-dashbordb1 rounded-full border-[#E5E7EB]-500 border-dotted pl-10">
                        <input
                            placeholder="Type message here"
                            className="py-5 w-[95%]  bg-sirp-dashbordb1 outline-none focus:ring-0"
                            value={formData}
                            onChange={handleChange}
                        />
                        <span
                            onClick={handleFormSubmit}
                            className={
                                formData
                                    ? 'flex align-middle justify-center w-[4rem] rounded-full border  bg-sirp-primary'
                                    : 'flex align-middle justify-center w-[4rem] rounded-full border  bg-[#B9C1C7]'
                            }
                        >
                            <Image
                                src={require(`../../../../public/icons/chat.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                                className="cursor-pointer"
                            />
                        </span>
                    </div>
                </form>
            </div>

            <Button
                variant="contained"
                onClick={scrollToBottom}
                style={{
                    position: 'fixed',
                    right: '1rem',
                    bottom: '10rem',
                    background: "grey",
                }}
            >
                <ArrowDownwardIcon />
            </Button>
        </div>
    );
}

export default ChatRoomId;
