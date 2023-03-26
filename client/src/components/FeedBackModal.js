import React, { useState } from 'react';
import { MdOutlineThumbUpOffAlt, MdOutlineThumbDown } from 'react-icons/md';

const FeedBackModal = (props) => {
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) return;

    props.setModalInfo({ visible: false });
  
    const response = await fetch('http://localhost:9000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feedback: value,
        answer: props.id,
      })
    });
  
    const data = response.json();
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => props.setModalInfo({ visible: false })}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-light-grey rounded-md shadow-lg">
              <div className="flex items-center sm:flex">
                <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 bg-green-100">
                  {
                    props.type ? <MdOutlineThumbUpOffAlt color='green' size={24} /> : <MdOutlineThumbDown color='red' size={24} />
                  }
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200" id="headlessui-dialog-title-:r6:" data-headlessui-state="open">
                    Provide additional feedback
                  </h3>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                  <textarea value={value} onChange={(e) => setValue(e.target.value)} rows={3} className="p-2 mt-2 bg-light-grey rounded-md border w-full text-[15px] leading-relaxed text-white" style={{ height: '90px', overflowY: 'hidden' }}>
                  </textarea>
                  <div className="items-center gap-2 mt-3 sm:flex">
                    <button
                      className="mt-2 p-2.5 flex-1 text-white rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      type="submit"
                    >
                        Submit feedback
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}

export default FeedBackModal;