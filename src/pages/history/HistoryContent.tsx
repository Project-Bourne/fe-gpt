import React, { useEffect, useState } from 'react';
import DeleteIcon from './deleteIcon';
import ListItem from './HistoryListItem';
import NoHistory from './NoHistory';
import { Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setHistory, updatePagination } from '@/redux/reducer/oracleSlice';
import ChatService from '@/services/chat.service';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@/components/ui/Table';
import NotificationService from '@/services/notification.service';
import { fetchData } from '@/hooks/FetchHistory';

function HistoryContent() {
    const { history } = useSelector((state: any) => state.oracle)
    const itemsPerPage = history?.itemsPerPage || 10;
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(history?.currentPage || 1);
    const dispatch = useDispatch()
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handlePageChange = async (page: number) => {
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

    const handleDelete = async (uuid: string) => {
        try {
            const response = await ChatService.deleteHistory(uuid)
            if (response.status) {
                NotificationService.success({
                    message: "Delete Successful!",
                    addedText: <p>{response.message}</p>,
                });
            } else {
                NotificationService.error({
                    message: "Error!",
                    addedText: <p>Something went wrong. Please try again</p>,
                });
            }
            await ChatService.getHistory()
            fetchData(dispatch)
        } catch (error) {
            console.log(error)
            NotificationService.error({
                message: "Error!",
                addedText: <p>Something went wrong. Please try again</p>,
            });
        }
    };

    return (
        <div>
            {loading &&
                <div className='fixed top-0 bottom-0 right-0 left-0  z-[1000000] flex items-center justify-center backdrop-blur-sm  bg-[#747474]/[0.1] backdrop-brightness-50'>
                    <CircularProgress />
                </div>}
            {history?.chats?.length > 0 ? (
                <>
                    <Table
                        data={history.chats.map(chat => ({
                            uuid: chat.uuid,
                            title: chat.title,
                            createdAt: chat.createdAt
                        }))}
                        totalItems={history.totalItems}
                        page={currentPage}
                        loading={loading}
                        onDelete={handleDelete}
                        onPageChange={handlePageChange}
                    />
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