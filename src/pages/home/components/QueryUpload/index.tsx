import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const QueryUpload = () => {
  const router = useRouter();
  const [formData, setFormData] = useState('');

  const handleChange = e => {
    const value = e.target.value;
    setFormData(value);
    console.log('Form Data:', formData);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    let id = 2
    router.push(`/home/oracle/${id}`);
    setFormData('');
  };

  return (
    <div className="pb-10 mt-[20rem]">
      <div className="flex flex-col gap-5 items-center justify-center">
        <p className="text-lg font-bold">No search queries yet</p>
        <p className="md:text-lg text-xs text-gray-500 mb-10">
          Your query results will appear here when you start querying
        </p>
      </div>
      <form onSubmit={handleFormSubmit} className="px-5">
        <div className="flex align-middle align w-full border-2 bg-sirp-dashbordb1 rounded-full border-[#E5E7EB]-500 border-dotted pl-10">
          <input
            placeholder="Enter search query"
            className="py-5 w-[95%]  bg-sirp-dashbordb1 outline-none focus:ring-0"
            value={formData}
            onChange={handleChange}
          />
          <span
            className={
              formData
                ? 'flex align-middle justify-center w-[4rem] rounded-full border  bg-sirp-primary'
                : 'flex align-middle justify-center w-[4rem] rounded-full border  bg-[#B9C1C7]'
            }
          >
            <Image
              src={require(`../../../../../public/icons/chat.svg`)}
              alt="upload image"
              width={20}
              height={20}
              priority
              onClick={handleFormSubmit}
              className="cursor-pointer"
            />
          </span>
        </div>
      </form>
    </div>
  );
};

export default QueryUpload;
