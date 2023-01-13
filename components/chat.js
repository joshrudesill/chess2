const Chat = () => {
  return (
    <div className='h-64 flex flex-col'>
      <div className='grow p-2 overflow-scroll overflow-x-hidden'>
        <div className='flex flex-row text-xs flex-wrap gap-2'>
          <p>
            <span className='font-bold text-yellow-400 mr-1'>CornMan123:</span>
            He lloHelloH elloHelloH elloHello HelloHelloHelloHell oHelloH e
            lloHell oH ell oHell oHello HelloHel loHe lloHelloH elloHel loHello
            HelloHelloHelloHe llo HelloHel loHelloHelloHello Hello HelloHello
          </p>
          <p>
            <span className='font-bold text-yellow-400 mr-1'>CornMan123:</span>
            He lloHelloH elloHelloH elloHello HelloHelloHelloHell oHelloH e
            lloHell oH ell oHell oHello HelloHel loHe lloHelloH elloHel loHello
            HelloHelloHelloHe llo HelloHel loHelloHelloHello Hello HelloHello
          </p>
        </div>
      </div>

      <input className='bg-neutral-600'></input>
    </div>
  );
};
export default Chat;
