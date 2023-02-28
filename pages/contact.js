import { MailIcon, DeviceMobileIcon } from "@primer/octicons-react";

import {
  MarkGithubIcon,
  CodeReviewIcon,
  LogIcon,
  ChevronLeftIcon,
} from "@primer/octicons-react";
import { useRouter } from "next/router";
const Contact = () => {
  const router = useRouter();
  return (
    <>
      <div className='flex flex-row w-screen h-screen'>
        <div className='flex justify-center h-full grow'>
          <div className='flex rounded-md flex-col gap-2 my-auto h-min w-min p-3'>
            <div className='tracking-widest text-neutral-300 text-lg'>
              Hello
            </div>
            <div className='border-2 rounded-md py-2 px-3 w-80 border-neutral-400 text-white flex flex-row items-center justify-between hover:border-lime-500 cursor-default group border-r-8'>
              <MailIcon
                size={24}
                className='text-lime-500 group-hover:animate-pulse'
              />
              <div className='select-all'>joshrudesill@gmail.com</div>
              <div className='text-xs text-red-500 '>preferred</div>
            </div>
            <div className='border-2 rounded-md py-2 px-3 w-80 border-neutral-400 text-white flex flex-row items-center gap-2 justify-between hover:border-lime-500 cursor-default group border-r-8'>
              <DeviceMobileIcon
                size={24}
                className='text-lime-500 group-hover:animate-pulse'
              />
              <div className='select-all '>+1 651 491 5052</div>
              <div className='text-xs text-neutral-300 '>WhatsApp + Phone</div>
            </div>
            <div className='flex flex-row justify-between mt-3 w-80'>
              <a
                className='rounded-md bg-teal-600 py-2 px-3 text-white font-semibold tracking-wide flex flex-row text-sm hover:bg-teal-700'
                href='https://github.com/joshrudesill/chess2'
                rel='noreferrer'
                target='_blank'
              >
                <MarkGithubIcon
                  verticalAlign='middle'
                  size={16}
                  className='my-auto mr-2'
                />
                <p className='my-auto'>Source</p>
              </a>

              <a
                className='rounded-md bg-teal-600 py-2 px-3 text-white font-semibold tracking-wide flex flex-row text-sm hover:bg-teal-700'
                href='https://blog.jrudesill.dev'
                rel='noreferrer'
                target='_blank'
              >
                <CodeReviewIcon
                  verticalAlign='middle'
                  size={16}
                  className='my-auto mr-2'
                />
                <p className='my-auto'>Blog</p>
              </a>
              <a
                className='rounded-md bg-teal-600 py-2 px-3 text-white font-semibold tracking-wide flex flex-row text-sm hover:bg-teal-700'
                href='https://jrudesill.dev'
                rel='noreferrer'
                target='_blank'
              >
                <LogIcon
                  verticalAlign='middle'
                  size={16}
                  className='my-auto mr-2'
                />
                <p className='my-auto'>Resume</p>
              </a>
            </div>
            <div className='flex w-full'>
              <button
                className='rounded-md bg-orange-500 py-2 px-2 mt-2 w-full text-white font-semibold tracking-wide flex flex-row text-sm hover:bg-orange-600'
                onClick={() => router.push("/")}
              >
                <ChevronLeftIcon
                  verticalAlign='middle'
                  size={24}
                  className='my-auto mr-1'
                />
                <p className='my-auto'>Home</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
