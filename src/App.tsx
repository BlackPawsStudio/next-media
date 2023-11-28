import { useEffect, useRef, useState } from 'react';

interface FileType {
  url: string;
  type: 'vid' | 'img';
  createdAt: number;
}

export const App = () => {
  const [source, setSource] = useState<FileType | null>(null);
  const [files, setFiles] = useState<FileType[]>([]);
  const [currentFile, setCurrentFile] = useState(0);

  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSource(files[currentFile]);
    setTimeout
    controlsRef.current && controlsRef.current.focus();
  }, [currentFile, files]);

  return (
    <>
      {files.length && source ? (
        <div
          ref={controlsRef}
          autoFocus
          tabIndex={1}
          onKeyDown={(e) => {
            console.log(e.keyCode);
            if (e.keyCode === 37 || e.keyCode === 65) {
              currentFile > 0 && setCurrentFile(currentFile - 1);
            }
            // right
            if (e.keyCode === 39 || e.keyCode === 68) {
              currentFile < files.length - 1 && setCurrentFile(currentFile + 1);
            }
          }}
        >
          {source.type === 'vid' ? (
            <video width="400" controls autoPlay className="h-screen mx-auto">
              <source src={source.url} type="video/mp4" />
            </video>
          ) : (
            <img src={source.url} className="h-screen mx-auto" />
          )}
        </div>
      ) : (
        <>
          <label
            htmlFor="folder"
            className="absolute w-full h-full top-0 left-0 z-10 bg-[#aaa] flex items-center justify-center cursor-pointer"
          >
            Выберите папку
          </label>
          <input
            className="absolute w-full h-full top-0 left-0"
            type="file"
            id="folder"
            directory=""
            webkitdirectory=""
            onChange={(e) => {
              const rawFiles = e.target.files;
              console.log(rawFiles);
              if (rawFiles) {
                const fileUrls: FileType[] = [];
                for (let i = 0; i < rawFiles.length; i++) {
                  let type: 'vid' | 'img' = 'img';
                  if (
                    rawFiles[i].name.toLowerCase().includes('.mov') ||
                    rawFiles[i].name.toLowerCase().includes('.mp4')
                  ) {
                    type = 'vid';
                  }
                  fileUrls.push({
                    url: URL.createObjectURL(rawFiles[i]),
                    type: type,
                    createdAt: rawFiles[i].lastModified,
                  });
                }
                setFiles(fileUrls.sort((a, b) => a.createdAt - b.createdAt));
              }
            }}
          />
        </>
      )}
    </>
  );
};