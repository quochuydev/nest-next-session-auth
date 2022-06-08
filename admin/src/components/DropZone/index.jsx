import { useState, useCallback } from "react";
import {
  DropZone as PolarisDropZone,
  Stack,
  Thumbnail,
  Caption,
} from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";

function DropZoneComponent(props) {
  const { files, handleDropZoneDrop } = props;
  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !files.length && <PolarisDropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              file?.url
                ? file.url
                : validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteMinor
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <PolarisDropZone onDrop={handleDropZoneDrop}>
      {uploadedFiles}
      {fileUpload}
    </PolarisDropZone>
  );
}

export default function DropZone(props) {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    async (_dropFiles, acceptedFiles, _rejectedFiles) => {
      console.log({ acceptedFiles });
      try {
        if (props.upload) {
          const result = await props.upload(acceptedFiles);
          console.log(result);
          setFiles((files) => [...files, ...result.files]);
          return;
        }
        setFiles((files) => [...files, ...acceptedFiles]);
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return (
    <DropZoneComponent files={files} handleDropZoneDrop={handleDropZoneDrop} />
  );
}
