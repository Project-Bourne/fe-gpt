import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { useRouter } from 'next/router';
import ChatService from '@/services/chat.service';
import NotificationService from '@/services/notification.service';
import WarningIcon from '@mui/icons-material/Warning';
import { useTruncate } from '@/components/custom-hooks';
import CircularProgress from '@mui/material/CircularProgress';

const QueryCard = ({ setShowQuery, setId, setIsLoading, setChats }) => {
  const router = useRouter();
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true

  const fetchHistories = async () => {
    try {
      const response = await ChatService.getHistory(1);
      if (response?.status && response?.data?.items) {
        const historiesWithTitles = response.data.items.slice(0, 4).map(item => ({
          ...item,
          title: item.userQuestion.split('\n')[0]
        }));
        setHistories(historiesWithTitles);
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

  const handleUseOption = async (text) => {
    setIsLoading(true)
    try {
      const dataObj = {
        message: text
      };
      const response = await ChatService.firstChat(dataObj);
      if (response.status) {
        setShowQuery(true);
        setId(response.data.uuid);
        const newResponse = await ChatService.getChat(response.data.uuid);
        if (response.status) {
          setChats(newResponse.data);
          // Refresh histories after successful query
          fetchHistories();
        }
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p>{response.message}</p>,
        });
      }
    } catch (error) {
      NotificationService.error({
        message: "Error!",
        addedText: <p>Something went wrong. please try again</p>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-10 mt-10">
        {/* card sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            <div className="col-span-2 flex justify-center items-center py-20">
              <CircularProgress style={{ color: '#4582C4' }} />
              <p className="ml-3 text-gray-600">Loading previous queries...</p>
            </div>
          ) : histories.length > 0 ? (
            histories.map((item) => (
              <div key={item.uuid}>
                <div className="bg-sirp-lightGrey py-5 px-5 rounded-[1rem] hover:shadow-md transition-shadow">
                  <p className="font-medium text-[15px] mb-3">{useTruncate(item.title, 100)}</p>
                  <div className="flex justify-end">
                    <Button
                      classNameStyle="flex border gap-x-1 bg-white items-center mt-2 justify-center rounded-[2rem] text-center hover:bg-sirp-primary hover:text-white transition-colors"
                      size="sm"
                      onClick={() => handleUseOption(item.userQuestion)}
                      background="bg-sirp-primary"
                      value={
                        <div className="flex gap-x-1 text-[12px] items-center py-2 px-3 justify-center">
                          <small className="text-sirp-primary text-sm text-center">
                            Try Query
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
            ))
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
