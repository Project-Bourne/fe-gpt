import React, { useState } from "react";
import Image from "next/image";
import CustomModal from "@/components/ui/CustomModal";
import Factcheck from "./ModalPopUp/Factcheck";
import Collaborate from "./ModalPopUp/Translator";
import DocumentExport from "./ModalPopUp/DocumentExport";
import { Tooltip } from "@mui/material";

type ActionIconsProps = {
  doc?: any;
};

const ActionIcons = ({ doc }: ActionIconsProps) => {
  const [factcheck, setFactcheck] = useState(false);
  const [collaborate, setCollaborate] = useState(false);
  const [documents, setDocuments] = useState(false);
  return (
    <>
      <div className="flex gap-2 px-5">
        <Tooltip title="Export to Collab">
          <Image
            src={require("../../../assets/icons/export_gray.svg")}
            alt="documents"
            className=" cursor-pointer"
            width={30}
            onClick={() => setDocuments(true)}
          />
        </Tooltip>
        <Tooltip title="Analyze">
          <Image
            src={require("../../../assets/icons/analyzer_gray.svg")}
            alt="documents"
            className=" cursor-pointer"
            width={30}
          />
        </Tooltip>
        <Tooltip title="Search">
          <Image
            src={require("../../../assets/icons/search_gray.svg")}
            alt="documents"
            className="cursor-pointer"
            width={30}
          />
        </Tooltip>
        <Tooltip title="Translate">
          <Image
            src={require("../../../assets/icons/translate_gray.svg")}
            alt="documents"
            className="cursor-pointer"
            width={30}
            onClick={() => setCollaborate(true)}
          />
        </Tooltip>
        <Tooltip title="Run Fact Checker">
          <Image
            src={require("../../../assets/icons/factcheck_gray.svg")}
            alt="documents"
            className="cursor-pointer"
            width={30}
            onClick={() => setFactcheck(true)}
          />
        </Tooltip>
      </div>
      {/* factcheck models */}
      {factcheck && (
        <CustomModal
        style="bg-white md:w-[50%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setFactcheck(false)}
        >
          <Factcheck />
        </CustomModal>
      )}

      {/* collaborate models */}

      {collaborate && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setCollaborate(false)}
        >
          <Collaborate />
        </CustomModal>
      )}
      {documents && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 md:px-5 px-4 pb-5"
          closeModal={() => setDocuments(false)}
        >
          <DocumentExport  />
        </CustomModal>
      )}
    </>
  );
};

export default ActionIcons;