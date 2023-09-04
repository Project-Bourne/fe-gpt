import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { useRouter } from 'next/router';
import ChatService from '@/services/chat.service';
import NotificationService from '@/services/notification.service';

const data = [
  {
    id: '1',
    title:
      'What is the most common economic challange of most third world countries?'
  },
  {
    id: '2',
    title:
      'Help me study for a promotional exam on computational statistics'
  },
  {
    id: '3',
    title:
      'Give me Ideas for a project I can build using Python'
  },
  {
    id: '4',
    title:
      'Explain Blockchain technology to me like a 5 year old'
  }
];

const QueryCard = ({setShowQuery, setId, setIsLoading, setChats}) => {
  const router = useRouter();

  const handleUseOption = async (text) => {
     setIsLoading(true)
            try {
                const dataObj = {
                    message: text
                };
                const response = await ChatService.firstChat(dataObj);
                console.log(response);
                if (response.status) {
                    setShowQuery(true);
                    setId(response.data.uuid);
                    const newResponse = await ChatService.getChat(response.data.uuid);
                    console.log(newResponse, 'newResponse');
                    response.status && setChats(newResponse.data);
                }else {
                  NotificationService.error({
                    message: "Error!",
                    addedText: <p>{response.message}</p>,
                });
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                NotificationService.error({
                  message: "Error!",
                  addedText: <p>Something went wrong. please try again</p>,
              });
            }
            setIsLoading(false)
  };
  return (
    <>

      <div className="mx-10 mt-10">
        {/* card sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {data.map((item, index) => (
            <div key={index}>
              <div className="bg-sirp-lightGrey py-5 px-3 rounded-[1rem] ">
                <p>{item.title}</p>
                <div className="flex justify-end">
                  <Button
                    classNameStyle="flex border gap-x-1 bg-white items-center mt-5 justify-center rounded-[2rem] text-center"
                    size="sm"
                    onClick={()=>handleUseOption(item.title)}
                    background="bg-sirp-primary"
                    value={
                      <div className="flex gap-x-1 text-[12px] items-center py-2 px-1 justify-center">
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
          ))}
        </div>
        {/* <QueryUpload /> */}
        <div className="mt-10">
          <div className="flex flex-col gap-5 items-center justify-center">
            <p className="text-lg font-bold">No search queries yet</p>
            <p className="md:text-lg text-xs text-gray-500 mb-10">
              Your query results will appear here when you start querying
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryCard;
