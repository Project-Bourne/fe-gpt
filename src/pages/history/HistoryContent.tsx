import React, { useEffect, useState } from 'react';
import DeleteIcon from './deleteIcon';
import ListItem from './HistoryListItem';
import NoHistory from './NoHistory';
import { Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setHistory, updatePagination } from '@/redux/reducer/oracleSlice';
import ChatService from '@/services/chat.service';
import CircularProgress from '@mui/material/CircularProgress';

function HistoryContent() {
    const { history } = useSelector((state: any) => state.oracle)
    const itemsPerPage = history?.itemsPerPage || 10;
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(history?.currentPage || 1);
    const dispatch = useDispatch()
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    const handlePageChange = async (event, page) => {
        setLoading(true)
        try {
            setCurrentPage(page);
            dispatch(updatePagination({ currentPage: page }));
            const data = await ChatService.getHistory(page)
            dispatch(setHistory(data?.data))
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    };

    return (
        <div>
            {loading &&
                <div className='fixed top-0 bottom-0 right-0 left-0  z-[1000000] flex items-center justify-center backdrop-blur-sm  bg-[#747474]/[0.1] backdrop-brightness-50'>
                    <CircularProgress />
                </div>}
            {history?.chats?.length > 0 ? (
                <>
                    {history?.chats?.map(item => {
                        return (
                            <div key={item.translationUuid} className='"bg-sirp-listBg border h-[100%] border-sirp-primaryLess1 rounded-lg w-[100%] md:mx-2 my-1'>
                                <ListItem
                                    uuid={item.uuid}
                                    title={item.title} // Pass the title
                                    time={item.createdAt}
                                    isArchived={item.bookmark} // Pass the isArchived value
                                    // buttonType="action"
                                    actionButtons={<DeleteIcon doc={item.title} />}
                                />
                            </div>
                        );
                    })}
                    <div className='w-full m-5 flex justify-end items-center'>
                        <Pagination
                            count={Math.ceil(history.totalItems / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant='outlined'
                            color='primary'
                        />
                    </div>
                </>
            ) : (
                <>
                    <NoHistory />
                </>
            )}
        </div>
    );
}

export default HistoryContent;