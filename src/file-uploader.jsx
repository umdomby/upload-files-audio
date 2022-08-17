import React, {useEffect, useState} from "react";
import "./file-uploader.css";

export const FileUploader = () => {
    const [image, setImage] = useState();
    const [imageURL, setImageURL] = useState();
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        setImageURL(fileReader.result);
    };
    const handleOnChange = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0];
            setImage(file);
            fileReader.readAsDataURL(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files.length) {
            setImage(event.dataTransfer.files[0]);
            fileReader.readAsDataURL(event.dataTransfer.files[0]);
        }
    };

    const handleDragEmpty = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };


    const audioTune = new Audio(imageURL)
    const [playInLoop, setPlayInLoop] = useState(false);

    // load audio file on component load
    useEffect(() => {
        audioTune.load();
    }, [])

    // set the loop of audio tune
    useEffect(() => {
        audioTune.loop = playInLoop;
    }, [playInLoop])

    // play audio sound
    const playSound = () => {
        audioTune.play();
    }

    // pause audio sound
    const pauseSound = () => {
        audioTune.pause();
    }

    // stop audio sound
    const stopSound = () => {
        audioTune.pause();
        audioTune.currentTime = 0;
    }


    return (
        <form className="file-uploader">
            <input type="button" className="btn btn-primary mr-2" value="Play" onClick={playSound}></input>
            <input type="button" className="btn btn-warning mr-2" value="Pause" onClick={pauseSound}></input>
            <input type="button" className="btn btn-danger mr-2" value="Stop" onClick={stopSound}></input>
            <label
                htmlFor="file-loader-button"
                className="file-uploader__custom-button"
            >
                Загрузить файл
            </label>
            <input
                id="file-loader-button"
                type="file"
                className="file-uploader__upload-button"
                onChange={handleOnChange}
            />
            <img
                // src={imageURL ? imageURL : "img.png"}
                src={"img.png"}
                className="file-uploader__preview"
                alt="preview"
                onDrop={handleDrop}
                onDragEnter={handleDragEmpty}
                onDragOver={handleDragEmpty}
            />
            <div className="file-uploader__file-name">{image ? image.name : ""}</div>
        </form>
    );
};
