import React, { useState } from 'react';
import Image from 'next/image';
import {
  setToggleEdit,
  settoggleActionIcon
} from '@/redux/reducer/oracleSlice';
import { useSelector, useDispatch } from 'react-redux';
import ActionIcons from '../components/ActionIcon';

function Index (){
  const { toggleEdit, toggleActionIcon } = useSelector(
    (store: any) => store.oracle
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState('');

  const handleChange = e => {
    const value = e.target.value;
    setFormData(value);
    console.log('Form Data:', formData);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    setFormData('');
  };

  const handleToggleEdit = () => {
    dispatch(setToggleEdit());
  };
  const handletoggleActionIcon = () => {
    dispatch(settoggleActionIcon());
  };

  return (
    <div className="mt-[8rem] h-[100%] pb-5 rounded-[1rem] relative bg-[#F9F9F9] mx-5 ">
      <div className="border-b-2 pb-10">
        <h1 className="text-2xl pl-3 pt-5 font-bold">Query Board</h1>
      </div>
      {/* user details */}
      <section className="rounded-[1rem] bg-sirp-accentBlue mx-5 mt-5 mb-10">
        <div className="flex justify-between w-full items-center px-5 border-b-2">
          <div className="flex justify-start items-center gap-5 py-1">
            <Image
              src={require(`../../../assets/icons/singleAvatar.svg`)}
              alt="upload image"
              width={30}
              height={20}
              priority
              className="cursor-pointer"
            />
            <h1>Chisom Herry</h1>
          </div>
          <Image
            src={require(`../../../assets/icons/three_dots.svg`)}
            alt="upload image"
            width={5}
            height={20}
            priority
            className="cursor-pointer py-1"
            onClick={handleToggleEdit}
          />
        </div>
        <div className="px-5 py-5 flex relative">
          <span className="text-[14px] text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, et
            porro! Officia natus quaerat assumenda optio, ullam animi illo
            corrupti.
          </span>
          {toggleEdit && (
            <Image
              src={require(`../../../assets/icons/edit_Icon.svg`)}
              alt="upload image"
              width={40}
              height={50}
              priority
              className="cursor-pointer py-1 z-10 absolute right-10 top-[-40px]"
            />
          )}
        </div>
      </section>

      {/* Oracle details */}
      <section className=" mx-5 mt-5 ">
        <div className="flex justify-between w-full items-center px-5 border-b-4 border-l-4  border-sirp-accentBlue">
          <div className="flex justify-start items-center gap-5 py-1">
            <Image
              src={require(`../../../assets/icons/oracleAvatar.svg`)}
              alt="upload image"
              width={30}
              height={20}
              priority
              className="cursor-pointer"
            />
            <h1>Oracle</h1>
          </div>
          <Image
            src={require(`../../../assets/icons/three_dots.svg`)}
            alt="upload image"
            width={5}
            height={20}
            priority
            className="cursor-pointer py-1"
            onClick={handletoggleActionIcon}
          />
        </div>
        <div className="flex relative pb-10 ">
          <span className="text-[14px] text-justify border-l-4 pt-10 leading-10 border-sirp-accentBlue pl-5 pb-32">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, et
            porro! Officia natus quaerat assumenda optio, ullam animi illo
            This website is operated by Web3D Media Incorporated, a
            Delaware-based corporation with a registered address at 651 N Broad
            St, New Castle, Delaware United States. (“Company”). These terms of
            use (“Terms”) govern the access, browsing and use by the users
            (“User” or “Users”, as applicable) of https://web3d.media/,
            including any of its subdomains and/or sections (“Website”); as well
            as the services rendered through the Website (“Service” or
            “Services”, as applicable) which include the download and use of
            certain content. Accessing and using the Website implies that the
            User has read and accepts to be bound by these Terms without
            exception. In case the User does not accept the Terms or have any
            objection to any part of the present Terms, the User must not use
            the Website. The Company may modify the Terms at any time and thus
            we recommend that the Terms are reviewed oThis website is operated by Web3D Media Incorporated, a
            Delaware-based corporation with a registered address at 651 N Broad
            St, New Castle, Delaware United States. (“Company”). These terms of
            use (“Terms”) govern the access, browsing and use by the users
            (“User” or “Users”, as applicable) of https://web3d.media/,
            including any of its subdomains and/or sections (“Website”); as well
            as the services rendered through the Website (“Service” or
            “Services”, as applicable) which include the download and use of
            certain content. Accessing and using the Website implies that the
            User has read and accepts to be bound by these Terms without
            exception. In case the User does not accept the Terms or have any
            objection to any part of the present Terms, the User must not use
            the Website. The Company may modify the Terms at any time and thus
            we recommend that the Terms are reviewed oThis website is operated by Web3D Media Incorporated, a
            Delaware-based corporation with a registered address at 651 N Broad
            St, New Castle, Delaware United States. (“Company”). These terms of
            use (“Terms”) govern the access, browsing and use by the users
            (“User” or “Users”, as applicable) of https://web3d.media/,
            including any of its subdomains and/or sections (“Website”); as well
            as the services rendered through the Website (“Service” or
            “Services”, as applicable) which include the download and use of
            certain content. Accessing and using the Website implies that the
            User has read and accepts to be bound by these Terms without
            exception. In case the User does not accept the Terms or have any
            objection to any part of the present Terms, the User must not use
            the Website. The Company may modify the Terms at any time and thus
            we recommend that the Terms are reviewed oThis website is operated by Web3D Media Incorporated, a
            Delaware-based corporation with a registered address at 651 N Broad
            St, New Castle, Delaware United States. (“Company”). These terms of
            use (“Terms”) govern the access, browsing and use by the users
            (“User” or “Users”, as applicable) of https://web3d.media/,
            including any of its subdomains and/or sections (“Website”); as well
            as the services rendered through the Website (“Service” or
            “Services”, as applicable) which include the download and use of
            certain content. Accessing and using the Website implies that the
            User has read and accepts to be bound by these Terms without
            exception. In case the User does not accept the Terms or have any
            objection to any part of the present Terms, the User must not use
            the Website. The Company may modify the Terms at any time and thus
            we recommend that the Terms are reviewed on a regular basis by the
            User. The date at the beginning of these Terms refers to the latest
            update of these Terms, which will be applicable from the date of
            publication. Some Services provided through the Website maThis website is operated by Web3D Media Incorporated, a
            Delaware-based corporation with a registered address at 651 N Broad
            St, New Castle, Delaware United States. (“Company”). These terms of
            use (“Terms”) govern the access, browsing and use by the users
            (“User” or “Users”, as applicable) of https://web3d.media/,
            including any of its subdomains and/or sections (“Website”); as well
            as the services rendered through the Website (“Service” or
            “Services”, as applicable) which include the download and use of
            certain content. Accessing and using the Website implies that the
            User has read and accepts to be bound by these Terms without
            exception. In case the User does not accept the Terms or have any
            objection to any part of the present Terms, the User must not use
            the Website. The Company may modify the Terms at any time and thus
            we recommend that the Terms are reviewed on a regular basis by the
            User. The date at the beginning of these Terms refers to the latest
            update of these Terms, which will be applicable from the date of
            publication. Some Services provided through the Website may be
            subject to specific conditions or instructions that must be accepted
            by the User prior to the provision of the relevant Service. These
            specific conditions may be imposed by the Company or by third
            parties. Such specific conditions shall apply in addition to theThis website is operated by Web3D Media Incorporated, a
            Delaware-based corporation with a registered address at 651 N Broad
            St, New Castle, Delaware United States. (“Company”). These terms of
            use (“Terms”) govern the access, browsing and use by the users
            (“User” or “Users”, as applicable) of https://web3d.media/,
            including any of its subdomains and/or sections (“Website”); as well
            as the services rendered through the Website (“Service” or
            “Services”, as applicable) which include the download and use of
            certain content. Accessing and using the Website implies that the
            User has read and accepts to be bound by these Terms without
            exception. In case the User does not accept the Terms or have any
            objection to any part of the present Terms, the User must not use
            the Website. The Company may modify the Terms at any time and thus
            we recommend that the Terms are reviewed on a regular basis by the
            User. The date at the beginning of these Terms refers to the latest
            update of these Terms, which will be applicable from the date of
            publication. Some Services provided through the Website may be
            subject to specific conditions or instructions that must be accepted
            by the User prior to the provision of the relevant Service. These
            specific conditions may be imposed by the Company or by third
            parties. Such specific conditions shall apply in addition to theThis website is operated by Web3D Media Incorporated, a
            Delaware-based corporation with a registered address at 651 N Broad
            St, New Castle, Delaware United States. (“Company”). These terms of
            use (“Terms”) govern the access, browsing and use by the users
            (“User” or “Users”, as applicable) of https://web3d.media/,
            including any of its subdomains and/or sections (“Website”); as well
            as the services rendered through the Website (“Service” or
            “Services”, as applicable) which include the download and use of
            certain content. Accessing and using the Website implies that the
            User has read and accepts to be bound by these Terms without
            exception. In case the User does not accept the Terms or have any
            objection to any part of the present Terms, the User must not use
            the Website. The Company may modify the Terms at any time and thus
            we recommend that the Terms are reviewed on a regular basis by the
            User. The date at the beginning of these Terms refers to the latest
            update of these Terms, which will be applicable from the date of
            publication. Some Services provided through the Website may be
            subject to specific conditions or instructions that must be accepted
            by the User prior to the provision of the relevant Service. These
            specific conditions may be imposed by the Company or by third
            parties. Such specific conditions shall apply in addition to theThis website is operated by Web3D Media Incorporated, a
            Delaware-based corporation with a registered address at 651 N Broad
            St, New Castle, Delaware United States. (“Company”). These terms of
            use (“Terms”) govern the access, browsing and use by the users
            (“User” or “Users”, as applicable) of https://web3d.media/,
            including any of its subdomains and/or sections (“Website”); as well
            as the services rendered through the Website (“Service” or
            “Services”, as applicable) which include the download and use of
            certain content. Accessing and using the Website implies that the
            User has read and accepts to be bound by these Terms without
            exception. In case the User does not accept the Terms or have any
            objection to any part of the present Terms, the User must not use
            the Website. The Company may modify the Terms at any time and thus
            we recommend that the Terms are reviewed on a regular basis by the
            User. The date at the beginning of these Terms refers to the latest
            update of these Terms, which will be applicable from the date of
            publication. Some Services provided through the Website may be
            subject to specific conditions or instructions that must be accepted
            by the User prior to the provision of the relevant Service. These
            specific conditions may be imposed by the Company or by third
            parties. Such specific conditions shall apply in addition to they be
            subject to specific conditions or instructions that must be accepted
            by the User prior to the provision of the relevant Service. These
            specific conditions may be imposed by the Company or by third
            parties. Such specific conditions shall apply in addition to then a regular basis by the
            User. The date at the beginning of these Terms refers to the latest
            update of these Terms, which will be applicable from the date of
            publication. Some Services provided through the Website may be
            subject to specific conditions or instructions that must be accepted
            by the User prior to the provision of the relevant Service. These
            specific conditions may be imposed by the Company or by third
            parties. Such specific conditions shall apply in addition to then a regular basis by the
            User. The date at the beginning of these Terms refers to the latest
            update of these Terms, which will be applicable from the date of
            publication. Some Services provided through the Website may be
            subject to specific conditions or instructions that must be accepted
            by the User prior to the provision of the relevant Service. These
            specific conditions may be imposed by the Company or by third
            parties. Such specific conditions shall apply in addition to then a regular basis by the
            User. The date at the beginning of these Terms refers to the latest
            update of these Terms, which will be applicable from the date of
            publication. Some Services provided through the Website may be
            subject to specific conditions or instructions that must be accepted
            by the User prior to the provision of the relevant Service. These
            specific conditions may be imposed by the Company or by third
            parties. Such specific conditions shall apply in addition to the
            corrupti.
          </span>
          <div className="absolute right-10 top-[-30px] ">
            {toggleActionIcon && <ActionIcons />}
          </div>
        </div>
      </section>

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
              className={
                formData
                  ? 'flex align-middle justify-center w-[4rem] rounded-full border  bg-sirp-primary'
                  : 'flex align-middle justify-center w-[4rem] rounded-full border  bg-[#B9C1C7]'
              }
            >
              <Image
                src={require(`../../../assets/icons/chat.svg`)}
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
    </div>
  );
};

export default Index;
