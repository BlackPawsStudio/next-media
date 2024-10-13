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

  const [angle, setAngle] = useState(0);

  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSource(files[currentFile]);
    setTimeout;
    controlsRef.current && controlsRef.current.focus();
  }, [currentFile, files]);

  useEffect(() => {
    setAngle(0);
  }, [currentFile]);

  return (
    <>
      {files.length && source ? (
        <div
          ref={controlsRef}
          autoFocus
          tabIndex={1}
          onKeyDown={(e) => {
            // left
            if (e.keyCode === 37 || e.keyCode === 65) {
              currentFile > 0 && setCurrentFile(currentFile - 1);
            }
            // right
            if (e.keyCode === 39 || e.keyCode === 68) {
              currentFile < files.length - 1 && setCurrentFile(currentFile + 1);
            }
            // rotate
            if (e.keyCode === 32) {
              const element = document.getElementById('media');
              if (element) {
                setAngle(angle + 1);
                element.style.transform = `rotate(${(angle + 1) * 90}deg)`;
              }
            }
          }}
        >
          <div className="text-white drop-shadow-md absolute top-1 left-1/2 -translate-x-1/2">
            {source.name}
          </div>
          {source.type === 'vid' ? (
            <video
              id="media"
              width="400"
              key={source.url}
              controls
              autoPlay
              className="h-screen mx-auto"
            >
              <source src={source.url} type="video/mp4" />
            </video>
          ) : (
            <img id="media" key={source.url} src={source.url} className="h-screen mx-auto" />
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
                setFiles(fileUrls.sort((a, b) => a.createdAt - b.createdAt));
              }
            }}
          />
        </>
      )}
    </>
  );
};
