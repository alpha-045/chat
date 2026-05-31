import styled from "styled-components";
import {BadgeX} from 'lucide-react'
export default function ChatFooter({
  handletext,
  imageprev,
  text,
  sub,
  handleImgprev,
  fileref,removeImg
}) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full ">
        <div className="relative ">
          {imageprev ? <div className="container-img w-40 relative top-3 z-25">
            <img src={imageprev} alt="" className="m-1 rounded-tr-3xl"/>
            <button className="absolute right-0 top-0 text-white cursor-pointer" onClick={removeImg}>  <BadgeX /></button>
          </div> : ""}

          <form action method encType="multipart/form-data" onSubmit={sub}>
            <div className="relative   border-t-2 border-amber-50">
              <textarea
                name="content"
                id="hs-textarea-ex-2"
                onChange={(e) => handletext(e.target.value)}
                value={text}
                className="p-4 pb-12 block w-full text-md focus:border-none focus:ring-0 focus:outline-none resize-none  text-white"
                placeholder="Write a message..."
                required
                defaultValue={""}
              />
              <div className="absolute bottom-0 inset-x-0 p-1 rounded-b-md bg-none">
                <div className="flex justify-end items-center z-30 ">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="inline-flex flex-shrink-0 justify-center items-center size-10 rounded-lg text-gray-500"
                    >
                      <label htmlFor="image" className="cursor-pointer">
                        <svg
                          className="flex-shrink-0 size-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                        <input
                          name="image"
                          id="image"
                          type="file"
                          className="hidden"
                          ref={fileref}
                          onChange={handleImgprev}
                        />
                      </label>
                    </button>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <button
                      type="submit"
                      className="inline-flex  w-15 flex-shrink-0 justify-center items-center size-9 rounded-lg text-white bg-blue-400 hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2"
                    >
                      <svg
                        className="flex-shrink-0 size-6"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
