import { useState, useCallback } from "react";
import DropZoneComponent from "./DropZoneComponent";

export default DropZone;

function DropZone(props) {
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
