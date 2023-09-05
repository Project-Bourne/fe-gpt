import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTruncate } from '@/components/custom-hooks';
import Image from 'next/image';
import NotificationService from '@/services/notification.service';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { fetchData } from '@/hooks/FetchHistory'
import ChatService from '@/services/chat.service';


function ListItem({
    uuid,
    title,
    time,
    actionButtons,
    isArchived
}) {
    const [showaction, setShowAction] = useState(0);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleHover = () => {
        setShowAction(1);
    };

    const handleHoverOut = () => {
        setShowAction(0);
    };

    const handleItemClick = () => {
        router.push(`/history/${uuid}`);
    };

    // const handleArchive = async (e, uuid) => {
    //     e.stopPropagation();
    //     try {
    //         await TranslatorService.bookMarkTranslation(uuid)
    //         fetchData(dispatch)
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // };

    const handleDelete = async (e, uuid) => {
        e.stopPropagation();
        try {
            const response = await ChatService.deleteHistory()
            if (response.status) {
                NotificationService.success({
                    message: "Delete Succeful!",
                    addedText: <p>{response.message}</p>,
                });
            } else{
                NotificationService.error({
                    message: "Error!",
                    addedText: <p>Something went wrong. please try again</p>,
                });
            }
            await ChatService.getHistory()
            fetchData(dispatch)
        } catch (error) {
            console.log(error)
            NotificationService.error({
                message: "Error!",
                addedText: <p>Something went wrong. please try again</p>,
            });
        }

    };

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
    const parsedDate = DateTime.fromISO(time, { zone: userTimeZone }); // Convert UTC date to user's local time zone
    const formattedDate = parsedDate.toFormat('yyyy-MM-dd HH:mm'); // Format the parsed date

    return (
        <div
            onClick={handleItemClick}
            onMouseOut={handleHoverOut}
            onMouseOver={handleHover}
            className={
                'text-[14px] flex items-center text-gray-500 hover:text-gray-400 hover:bg-sirp-primaryLess2 p-2 cursor-pointer  hover:shadow justify-between'
            }
        >
            <div className="flex gap-3 items-center  hover:text-gray-400">
                {/* <Image
                    src={
                        isArchived
                            ? require(`../../../public/icons/on.saved.svg`)
                            : require(`../../../public/icons/saved.svg`)
                    }
                    alt="documents"
                    className="cursor-pointer w-4 h-4"
                    width={10}
                    height={10}
                    // onClick={(e) => handleArchive(e, translateid)}
                /> */}
                <p className="text-sirp-black-500 ml-2 md:w-[40rem] hover:text-gray-500">
                    {useTruncate(title, 60)}
                </p>
            </div>
            {/* {showaction === 0 ? (
                <div className="md:w-[23rem] hidden md:block">
                    <p className="text-gray-400 border-l-2 pl-2 ">{useTruncate(translation, 20)}</p>
                </div>

            ) : null} */}
            {/* time */}
            <div className="flex w-[8rem] mr-[3rem] md:mr-[5rem]">
                <p>{formattedDate}</p>
            </div>
            {/* overflow buttons */}
            {showaction === 1 && (
                <div className="border-l-2" onClick={(e) => handleDelete(e, uuid)}>
                    {actionButtons}
                </div>
            )}
        </div>
    );
}

export default ListItem;