import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import style from "./addFile.module.css";

const props: UploadProps = {
  name: "file",
  // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const AddPhoto: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />} className={style.button_file}>
      Добавить фото
    </Button>
  </Upload>
);

export default AddPhoto;
