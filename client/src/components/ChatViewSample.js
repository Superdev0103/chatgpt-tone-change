/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage';
import Thinking from './Thinking';
import useDarkMode from '../hooks/useDarkMode';
import { Checkbox } from 'antd';
import { BASE_URL, headerDescription, toneList } from '../config/constant';
import axios from 'axios';

const ChatViewSample = () => {
    const [, setDarkTheme] = useDarkMode();
    const messagesEndRef = useRef();
    const [formValue, setFormValue] = useState('');
    const [thinking, setThinking] = useState(false);
    const [toneValue, setToneValue] = useState(toneList.map(() => {return false}));
    const [chatContent, setChatContent] = useState([{
        id: 1,
        text: '**Hello!** *How can I help you today?*',
        ai: true
    }]);
    const [inputTone, setInputTone] = useState("");
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const updateMessage = (newValue, ai = false, selected) => {
        const id = Date.now() + Math.floor(Math.random() * 1000000)
        const newMsg = {
            id: id,
            text: newValue,
            ai: ai,
            selected: `${selected}`
        }
        const array = chatContent;
        array.push(newMsg);
        setChatContent(array);
    }

    const sendMessage = async () => {
        let newMsg = formValue;
        const POST_URL = BASE_URL;
        const param = chatContent.map((item) => ({
            role: item.ai ? "assistant": "user",
            content: item.text
        }));

        setThinking(true);
        scrollToBottom();
        setFormValue('');
        updateMessage(newMsg, false);
        param.push({
            role: "user",
            content: newMsg
        });
        const response = await axios.post(POST_URL, param);
        const data = response.data;

        if (response.status === 200) {
            // The request was successful
            data.bot && updateMessage(data.bot, true);
        } else if (response.status === 429) {
            setThinking(false);
        } else {
            // The request failed
            window.alert(`openAI is returning an error: ${response.status + response.statusText} 
            please try again later`);
            console.log(`Request failed with status code ${response.status}`);
            setThinking(false);
        }

        setThinking(false);
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && formValue && e.shiftKey === false) {
            if (formValue.toLocaleLowerCase() === "refresh") {
                setChatContent([{
                    id: 1,
                    text: '**Hello!** *How can I help you today?*',
                    ai: true
                }]);
                const tmp = toneList.map(() => {return false});
                setToneValue(tmp);
            } else {
                sendMessage();
            }
        }
    }

    const handleKeyUp = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            setFormValue("");
            setInputTone("");
            const tmp = toneList.map(() => {return false});
            setToneValue(tmp);
        }
    }

    const handleToneChange = (e) => {
        const temp = toneValue.map((item, index) => {
            if (e === index) return !item;
            else return item;
        });
        setToneValue(temp);
        let variable = '';
        if (temp.filter(item => item === true).length > 0) {
            variable = headerDescription + '\n';
            let num = 1
            temp.forEach((item, index) => {
                if (item) {
                    variable += num + ') ' + toneList[index].description + '\n';
                    num ++;
                }
            });
            if (inputTone === '') {
                if (formValue === '') {
                    setFormValue(variable);
                    setInputTone(variable);
                } else {
                    setFormValue(formValue + '\n' + variable);
                    setInputTone(variable);
                }
            } else {
                setFormValue(formValue.replace(inputTone, variable));
                setInputTone(variable);
            }
        } else {
            setFormValue("");
            setInputTone("");
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [thinking]);

    useEffect(() => {
        setDarkTheme(true);
    }, []);

    return (
        <div className="chatview">
            <main className='chatview__chatarea'>

            {
                chatContent.map((message, index) => (
                    <ChatMessage key={index} message={{ ...message }} />
                ))
            }

                {thinking && <Thinking />}

                <span ref={messagesEndRef}></span>
            </main>
            <div className='form'>
                {/* <Select
                    mode="multiple"
                    maxTagCount='responsive'
                    className='tone-select'
                    placeholder="tone"
                    size='large'
                    style={{width:"300px"}}
                    value={toneValue}
                    onChange={handleToneChange}
                >
                    {
                        toneList.map((item, index) => (<Option key={index} value={item.description}>{item.tone}</Option>))
                    }
                </Select> */}
                <div className='flex flex-wrap mb-4 ml-2 mr-4 self-center'>
                    {
                        toneList.map((item, index) => (
                            <Checkbox
                                className='text-2xl text-white ml-2 items-center hover:text-slate-400 transition-colors duration-200 tone-checkbox'
                                key={index}
                                value={item.description}
                                checked={toneValue[index]}
                                onChange={() => handleToneChange(index)}
                            >
                                {item.tone}
                            </Checkbox>
                        ))
                    }
                </div>
                <textarea className='chatview__textarea-message' value={formValue} onChange={(e) => setFormValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => handleKeyUp(e)} />
            </div>
        </div>
    )
}

export default ChatViewSample