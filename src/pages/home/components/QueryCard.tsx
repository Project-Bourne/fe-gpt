import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { useRouter } from 'next/router';
import ChatService from '@/services/chat.service';
import NotificationService from '@/services/notification.service';
import WarningIcon from '@mui/icons-material/Warning';
import { useTruncate } from '@/components/custom-hooks';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

const QueryCard = ({ setShowQuery, setId, setIsLoading, setChats }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { history } = useSelector((state: any) => state.oracle);
  const { userInfo } = useSelector((state: any) => state.auth);

  // Filter out histories with empty titles and take the first 4
  const histories = history?.chats
    ?.filter(chat => chat.title && !chat.delete)
    .slice(0, 4)
    .map(chat => ({
      ...chat,
      title: chat.title.split('\n')[0] // Get first line of title
    })) || [];

  const fetchHistories = async () => {
    try {
      setLoading(true);
      const response = await ChatService.getHistory(1);
      if (!response?.status) {
        throw new Error('Failed to fetch histories');
      }
    } catch (error) {
      console.error('Error fetching histories:', error);
      NotificationService.error({
        message: "Error!",
        addedText: <p>Failed to fetch chat histories</p>,
        position: 'bottom-right'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistories();
    // Set up polling to refresh histories every 30 seconds
    const interval = setInterval(fetchHistories, 30000);
    return () => clearInterval(interval);
  }, []);

  // Update loading state when histories change
  useEffect(() => {
    if (history?.chats) {
      setLoading(false);
    }
  }, [history?.chats]);

  const handleUseOption = (uuid: string) => {
    router.push(`/history/${uuid}`);
  };

  return (
    <>
      <div className="mx-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <div className="col-span-2 flex justify-center items-center py-20">
              <CircularProgress style={{ color: '#4582C4' }} />
              <p className="ml-3 text-gray-600">Loading your previous queries...</p>
            </div>
          ) : histories.length > 0 ? (
            <>
              <p className='text-center mb-4 md:col-span-2'>
                Below are your last four queries. Click on any to view its full conversation history.
              </p>
              {histories.map((item) => (
                <div key={item.uuid} className="transform transition-all duration-200 hover:scale-[1.02]">
                  <div className="bg-sirp-lightGrey py-5 px-5 rounded-[1rem] hover:shadow-lg transition-shadow">
                    <p className="font-medium text-[15px] mb-3 line-clamp-2">
                      {useTruncate(item.title, 100)}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <Button
                        classNameStyle="flex border gap-x-1 bg-white items-center justify-center rounded-[2rem] text-center hover:text-white transition-colors"
                        size="sm"
                        onClick={() => handleUseOption(item.uuid)}
                        background="bg-sirp-primary"
                        value={
                          <div className="flex gap-x-1 text-[12px] items-center py-2 px-3 justify-center">
                            <small className="text-sirp-primary text-sm text-center">
                              View
                            </small>
                            <Image
                              src={require('../../../../public/icons/blueArrow.svg')}
                              alt="Blue Arrow Icon"
                              width={14}
                              height={50}
                              className="self-center"
                              style={{ alignSelf: 'center' }}
                              priority
                            />
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="col-span-2">
              <div className="mt-10">
                <div className="flex flex-col gap-1 items-center justify-center">
                  <p className="text-lg font-bold">No search queries yet</p>
                  <p className="md:text-lg text-xs text-gray-500 text-center">
                    Your query results will appear here when you start querying.
                  </p>
                  <span className='flex items-center gap-2 mt-4'>
                    <WarningIcon style={{ color: 'coral' }} />
                    <p className='font-bold text-sm'>I'm RIDU Oracle, your creative and helpful Analyst. I have limitations and won't always get it right.</p>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QueryCard;
