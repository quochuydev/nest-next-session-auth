import { useState, useCallback } from "react";
import DropZoneComponent from './DropZoneComponent'

export default DropZone;

function DropZone(props) {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    async (_dropFiles, acceptedFiles, _rejectedFiles) => {
      console.log(acceptedFiles);
      if(props.upload){
        const newfiles = await props.upload(acceptedFiles);
        return setFiles((files) => [...files, ...newfiles])
      }
      return setFiles((files) => [...files, ...acceptedFiles])
    },
    [],
  );

  return <DropZoneComponent files={files} handleDropZoneDrop={handleDropZoneDrop} />
}