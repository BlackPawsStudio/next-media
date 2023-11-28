import { useEffect, useRef, useState } from 'react';

interface FileType {
  url: string;
  type: 'vid' | 'img';
  createdAt: number;
  name: string;
}

export const App = () => {
  const [source, setSource] = useState<FileType | null>(null);
  const [files, setFiles] = useState<FileType[]>([]);
  const [currentFile, setCurrentFile] = useState(0);

  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSource(files[currentFile]);
    setTimeout;
    controlsRef.current && controlsRef.current.focus();
  }, [currentFile, files]);


  useEffect(() => {
    console.log(currentFile);
  }, [currentFile])

  return (
    <>
      {files.length && source ? (
        <div
          ref={controlsRef}
          autoFocus
          tabIndex={1}
          onKeyDown={(e) => {
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
            <video width="400" key={source.url} controls autoPlay className="h-screen mx-auto">
              <source src={source.url} type="video/mp4" />
            </video>
          ) : (
            <img key={source.url} src={source.url} className="h-screen mx-auto" />
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            directory=""
            webkitdirectory=""
            onChange={(e) => {
              const rawFiles = e.target.files;
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
                    name: rawFiles[i].name,
                  });
                }
                console.log(rawFiles);
                console.log(fileUrls);
                setFiles(
                  fileUrls.sort(
                    (a, b) =>
                      Number(a.name.split('.')[0].replace('', '.')) -
                      Number(b.name.split('.')[0].replace('', '.'))
                  )
                );
              }
            }}
          />
        </>
      )}
    </>
  );
};
