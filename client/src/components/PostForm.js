import React, { useEffect, useState } from 'react';
import { typeSettings } from '../utils/settings';

function PostForm(props) {
    const [selectedType, setSelectedType] = useState("text");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isTextInput, setIsTextInput] = useState(true);
    const [acceptedFormats, setAcceptedFormats] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [submitFailed, setSubmitFailed] = useState(false);

    useEffect(() => {
        if(!isTextInput) {
            if(selectedType === "image") {
                setAcceptedFormats(".gif,.jpg,.jpeg,.png");
            }
            else if(selectedType === "audio") {
                setAcceptedFormats(".mp3");
            }
            else if(selectedType === "video") {
                setAcceptedFormats(".mp4,.mov,.avi");
            }
        }

        if((content.replace(/\s+/g, "").length !== 0)) {
            setIsDisabled(false);
        }
        else setIsDisabled(true)
    }, [isTextInput, selectedType, content]);

    const submitForm = (e) => {
        e.preventDefault();  
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, type: selectedType, tags })
        };

        if(selectedType !== 'text') {
            mediaPostSubmission(requestOptions, selectedFile);
        }
        else {
            textPostSubmission(requestOptions);
        }
    }

    const mediaPostSubmission = (requestOptions, selectedFile) => {
        fetch('/api/v1/posts', requestOptions)
            .then(response => response.json())
            .then(data => {
                const createdPostId = data.data._id;

                let formData = new FormData();
                formData.append("file", selectedFile, selectedFile.name);

                const filePostOptions = {
                    method: 'POST',
                    body: formData
                };
                
                fetch(`/api/v1/posts/${createdPostId}/files`, filePostOptions)
                .then(res => res.json())
                .then(fileUploadData => {
                    console.log(data, fileUploadData);
                    window.location.reload(); 
                })
                .catch(e => setSubmitFailed(true))
            })
            .catch(e => setSubmitFailed(true));
    }

    const textPostSubmission = (requestOptions) => { 
        fetch('/api/v1/posts', requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload();              
            })
            .catch(e => setSubmitFailed(true));
    }

    return (
        <div className="row mb-3">
            <div className="col-lg-6 offset-lg-3">
                <div className="card">
                    <div className="card-body">
                        <form>
                            <textarea 
                                className="form-control if-textarea" 
                                id="content" 
                                aria-label="Create a Post" 
                                placeholder="What's on your mind"
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                            ></textarea>
                            <input className="form-control if-input my-1" aria-label="Tags" type="text" placeholder="Add any tags" 
                                onChange={(e) => {
                                const tagsString = e.target.value.replace(/\s+/g, "");
                                setTags(tagsString.split(","));
                            }} />
                            { !isTextInput && 
                                <div className="form-group">
                                    <input 
                                        type="file" 
                                        className="form-control-file" 
                                        id="postFile" 
                                        accept={acceptedFormats}
                                        onChange={(e) => {
                                            //console.log(e.target.files[0])
                                            setSelectedFile(e.target.files[0]);
                                        }} 
                                    />
                                </div>
                            }
                            <div className="d-flex mt-2">
                                <div className="if-type-btns">
                                    {typeSettings.slice(1).map((option, e) => (
                                        <div className="form-check form-check-inline" key={e}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                id={`type${e}`}
                                                value={option.value}
                                                checked={selectedType === option.value}
                                                onChange={(e) => {
                                                    setSelectedType(e.target.value);
                                                    if(e.target.value !== "text") setIsTextInput(false);
                                                    else setIsTextInput(true);
                                                }}
                                                
                                            />
                                            <label className="form-check-label" 
                                                htmlFor={`type${e}`} 
                                                aria-label={`${option.name}`} 
                                                title={`${option.name}`}
                                            >
                                                <i className={`fa fas ${option.icon} fa-2x`}></i>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="ml-auto">
                                    <button className="btn if-btn-burgundy" disabled={isDisabled} onClick={submitForm}>Post</button>
                                </div>
                            </div>
                            {submitFailed &&
                                <div class="alert alert-danger" role="alert">
                                    Post not created
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostForm;
