import React, { useState, useEffect } from "react";

import { Upload, Modal } from "antd";
import { UploadFile } from "antd/lib/upload/interface";

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

type Props = {
  attachments: UploadFile<any>[];
  removeAttachment: (file: UploadFile<any>) => void;
};

let UploadFiles: React.FC<Props> = ({ attachments, removeAttachment }) => {
  let [previewVisible, setPreviewVisible] = useState<boolean>(false);
  let [previewImage, setPreviewImage] = useState<string>("");
  let [fileList, setFileList] = useState<UploadFile<any>[]>(attachments);
  let handleCancel = () => {
    setPreviewVisible(false);
  };

  let handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  let handleChange = (data: {
    file: UploadFile<any>;
    fileList: Array<UploadFile<any>>;
  }) => {
    setFileList(data.fileList);
  };
  useEffect(() => {
    setFileList(attachments);
  }, [attachments]);
  return (
    <div className="clearfix">
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={file => {
          removeAttachment(file);
        }}
      ></Upload>{" "}
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>{" "}
    </div>
  );
};

export default UploadFiles;