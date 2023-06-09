/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from 'react';
import { MdMenu, MdAdd, MdOutlineLogout, MdOutlineQuestionAnswer } from 'react-icons/md';
import { ChatContext } from '../context/chatContext';
import bot from '../assets/favicon.ico'
import DarkMode from './DarkMode';
// import { auth } from '../firebase'

/**
 * A sidebar component that displays a list of nav items and a toggle 
 * for switching between light and dark modes.
 * 
 * @param {Object} props - The properties for the component.
 */
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [, , clearMessages] = useContext(ChatContext);
  /**
   * Toggles the dark mode.
   */
  const clearChat = async () => {
    clearMessages();

    await fetch('http://localhost:9000/api/clear');
  }

  return (
    <section className={` ${open ? "w-72" : "w-20 "} sidebar`}>
      <div className="sidebar__app-bar">
        <div className={`sidebar__app-logo ${!open && "scale-0 hidden"}`}>
          <span className='w-8 h-8'><img src={bot} alt="" /></span>
        </div>
        <h1 className={`sidebar__app-title ${!open && "scale-0 hidden"}`}>
          ChatGPT
        </h1>
        <div className='sidebar__btn-close' onClick={() => setOpen(!open)}>
          <MdMenu className='sidebar__btn-icon' />

        </div>
      </div>
      <div className="nav">
        <span className='nav__item  bg-light-white' onClick={clearChat}>
          <div className='nav__icons'>
            <MdAdd />
          </div>
          <h1 className={`${!open && "hidden"}`}>New chat</h1>
        </span>
      </div>
      <div className="nav__bottom">
        <DarkMode open={open} />
        <div className="nav">
          <a href='#' className="nav__item">
            <div className="nav__icons">
              <MdOutlineQuestionAnswer />
            </div>
            <h1 className={`${!open && "hidden"}`}>Update & FAQ</h1>
          </a>
        </div>
        <div className="nav">
          <span className="nav__item">
            <div className="nav__icons">
              <MdOutlineLogout />
            </div>
            <h1 className={`${!open && "hidden"}`}>Log out</h1>
          </span>
        </div>
      </div>
    </section >
  )
}

export default SideBar;