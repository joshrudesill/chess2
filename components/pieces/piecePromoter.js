import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  resetPieceState,
  transformPieceOnPromotion,
} from "../../features/board/boardSlice";

const PiecePromoter = ({ piece }) => {
  const boxRef = useRef(null);
  const dispatch = useDispatch();
  const dispatchPiecePromotion = (t) => {
    dispatch(
      transformPieceOnPromotion({
        x: piece.x,
        y: piece.y,
        pieceType: t,
      })
    );
    dispatch(resetPieceState());
  };
  return (
    <div className='z-[60] w-full h-full'>
      <div className='h-[400%] bg-slate-300 shadow-2xl'>
        <div
          className='h-[25%] w-full flex justify-center'
          onClick={() => dispatchPiecePromotion(5)}
        >
          <div
            className='h-[80%] w-[80%] mx-auto my-auto'
            ref={boxRef}
            onClick={() => dispatchPiecePromotion(5)}
          >
            <svg
              width={`${boxRef.current?.clientWidth}`}
              height={`${boxRef.current?.clientHeight}`}
              viewBox='0 0 180 165'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {piece.white ? (
                <g clip-path='url(#clip0_101_110)'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M21.8 33.5499C21.8 36.0429 20.8096 38.4339 19.0468 40.1967C17.284 41.9595 14.893 42.9499 12.4 42.9499C9.90696 42.9499 7.51604 41.9595 5.7532 40.1967C3.99035 38.4339 3 36.0429 3 33.5499C3 31.0569 3.99035 28.6659 5.7532 26.9031C7.51604 25.1403 9.90696 24.1499 12.4 24.1499C14.893 24.1499 17.284 25.1403 19.0468 26.9031C20.8096 28.6659 21.8 31.0569 21.8 33.5499V33.5499Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M99.35 12.4C99.35 14.893 98.3597 17.284 96.5969 19.0468C94.834 20.8096 92.4431 21.8 89.95 21.8C87.457 21.8 85.0661 20.8096 83.3032 19.0468C81.5404 17.284 80.55 14.893 80.55 12.4C80.55 9.90696 81.5404 7.51604 83.3032 5.7532C85.0661 3.99036 87.457 3 89.95 3C92.4431 3 94.834 3.99036 96.5969 5.7532C98.3597 7.51604 99.35 9.90696 99.35 12.4V12.4Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M176.9 33.5499C176.9 36.0429 175.91 38.4339 174.147 40.1967C172.384 41.9595 169.993 42.9499 167.5 42.9499C165.007 42.9499 162.616 41.9595 160.853 40.1967C159.09 38.4339 158.1 36.0429 158.1 33.5499C158.1 31.0569 159.09 28.6659 160.853 26.9031C162.616 25.1403 165.007 24.1499 167.5 24.1499C169.993 24.1499 172.384 25.1403 174.147 26.9031C175.91 28.6659 176.9 31.0569 176.9 33.5499V33.5499Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M59.4001 17.1C59.4001 19.593 58.4097 21.9839 56.6469 23.7468C54.8841 25.5096 52.4931 26.5 50.0001 26.5C47.5071 26.5 45.1161 25.5096 43.3533 23.7468C41.5905 21.9839 40.6001 19.593 40.6001 17.1C40.6001 14.6069 41.5905 12.216 43.3533 10.4531C45.1161 8.69031 47.5071 7.69995 50.0001 7.69995C52.4931 7.69995 54.8841 8.69031 56.6469 10.4531C58.4097 12.216 59.4001 14.6069 59.4001 17.1V17.1Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M139.3 19.45C139.3 21.9431 138.31 24.334 136.547 26.0969C134.784 27.8597 132.393 28.85 129.9 28.85C127.407 28.85 125.016 27.8597 123.253 26.0969C121.49 24.334 120.5 21.9431 120.5 19.45C120.5 16.957 121.49 14.5661 123.253 12.8032C125.016 11.0404 127.407 10.05 129.9 10.05C132.393 10.05 134.784 11.0404 136.547 12.8032C138.31 14.5661 139.3 16.957 139.3 19.45V19.45Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M26.5001 99.3501C66.4501 92.3001 125.2 92.3001 153.4 99.3501L162.8 42.9501L129.9 94.6501V28.85L104.05 92.3001L89.9501 21.8L75.8501 92.3001L50.0001 26.5V94.6501L17.1001 42.9501L26.5001 99.3501Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M26.5 99.35C26.5 108.75 33.55 108.75 38.25 118.15C42.95 125.2 42.95 122.85 40.6 134.6C33.55 139.3 33.55 146.35 33.55 146.35C26.5 153.4 35.9 158.1 35.9 158.1C66.45 162.8 113.45 162.8 144 158.1C144 158.1 151.05 153.4 144 146.35C144 146.35 146.35 139.3 139.3 134.6C136.95 122.85 136.95 125.2 141.65 118.15C146.35 108.75 153.4 108.75 153.4 99.35C113.45 92.3 66.45 92.3 26.5 99.35Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M38.25 118.15C54.7 113.45 125.2 113.45 141.65 118.15'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M40.6001 134.6C68.8001 129.9 111.1 129.9 139.3 134.6'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </g>
              ) : (
                <g clip-path='url(#clip0_101_102)'>
                  <path
                    d='M12.925 44.6501C20.0633 44.6501 25.85 38.8633 25.85 31.725C25.85 24.5868 20.0633 18.8 12.925 18.8C5.78672 18.8 0 24.5868 0 31.725C0 38.8633 5.78672 44.6501 12.925 44.6501Z'
                    fill='black'
                  />
                  <path
                    d='M50.5251 30.55C57.6634 30.55 63.4501 24.7632 63.4501 17.625C63.4501 10.4867 57.6634 4.69995 50.5251 4.69995C43.3868 4.69995 37.6001 10.4867 37.6001 17.625C37.6001 24.7632 43.3868 30.55 50.5251 30.55Z'
                    fill='black'
                  />
                  <path
                    d='M90.475 25.85C97.6133 25.85 103.4 20.0633 103.4 12.925C103.4 5.78672 97.6133 0 90.475 0C83.3368 0 77.55 5.78672 77.55 12.925C77.55 20.0633 83.3368 25.85 90.475 25.85Z'
                    fill='black'
                  />
                  <path
                    d='M130.425 30.55C137.563 30.55 143.35 24.7632 143.35 17.625C143.35 10.4867 137.563 4.69995 130.425 4.69995C123.287 4.69995 117.5 10.4867 117.5 17.625C117.5 24.7632 123.287 30.55 130.425 30.55Z'
                    fill='black'
                  />
                  <path
                    d='M168.025 44.6501C175.163 44.6501 180.95 38.8633 180.95 31.725C180.95 24.5868 175.163 18.8 168.025 18.8C160.887 18.8 155.1 24.5868 155.1 31.725C155.1 38.8633 160.887 44.6501 168.025 44.6501Z'
                    fill='black'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M27.0249 97.5249C66.9749 90.4749 125.725 90.4749 153.925 97.5249L165.675 38.775L130.425 92.8249L129.015 26.5549L104.575 90.4749L90.4749 22.325L76.3749 90.4749L51.9349 26.5549L50.5249 92.8249L15.2749 38.775L27.0249 97.5249Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M27.0249 97.525C27.0249 106.925 34.0749 106.925 38.7749 116.325C43.4749 123.375 43.4749 121.025 41.1249 132.775C34.0749 137.475 34.0749 144.525 34.0749 144.525C27.0249 151.575 36.4249 156.275 36.4249 156.275C66.9749 160.975 113.975 160.975 144.525 156.275C144.525 156.275 151.575 151.575 144.525 144.525C144.525 144.525 146.875 137.475 139.825 132.775C137.475 121.025 137.475 123.375 142.175 116.325C146.875 106.925 153.925 106.925 153.925 97.525C113.975 90.475 66.9749 90.475 27.0249 97.525Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M36.425 156.275C71.4295 168.453 109.521 168.453 144.525 156.275'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M36.425 111.625C71.4295 99.4474 109.521 99.4474 144.525 111.625'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M43.4751 123.375H137.475'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M38.7749 137.475C72.3456 148.589 108.604 148.589 142.175 137.475'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M34.075 151.575C70.4998 164.869 110.45 164.869 146.875 151.575'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </g>
              )}
              <defs>
                <clipPath id='clip0_101_110'>
                  <rect width='180' height='165' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div
          className='h-[25%] w-full flex justify-center'
          onClick={() => dispatchPiecePromotion(2)}
        >
          <div
            className='h-[70%] w-[80%] mx-auto my-auto'
            onClick={() => dispatchPiecePromotion(2)}
          >
            <svg
              width={`${boxRef.current?.clientWidth}`}
              height={`${boxRef.current?.clientHeight}`}
              viewBox='0 0 133 147'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {piece.white ? (
                <g clip-path='url(#clip0_101_107)'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M3 144H129.9V129.9H3V144Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M17.1001 129.9V111.1H115.8V129.9H17.1001Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M12.3999 26.5V3H31.1999V12.4H54.6999V3H78.1999V12.4H101.7V3H120.5V26.5'
                    fill='white'
                  />
                  <path
                    d='M12.3999 26.5V3H31.1999V12.4H54.6999V3H78.1999V12.4H101.7V3H120.5V26.5'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M120.5 26.5L106.4 40.6H26.4999L12.3999 26.5'
                    fill='white'
                  />
                  <path
                    d='M120.5 26.5L106.4 40.6H26.4999L12.3999 26.5'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M106.4 40.6001V99.3501H26.5V40.6001'
                    fill='white'
                  />
                  <path
                    d='M106.4 40.6001V99.3501H26.5V40.6001'
                    stroke='black'
                    stroke-width='5'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M106.4 99.3501L113.45 111.1H19.4502L26.5002 99.3501'
                    fill='white'
                  />
                  <path
                    d='M106.4 99.3501L113.45 111.1H19.4502L26.5002 99.3501'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M12.3999 26.5H120.5'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                </g>
              ) : (
                <g clip-path='url(#clip0_101_105)'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M3 144H129.9V129.9H3V144Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M19.4502 111.1L26.5002 99.35H106.4L113.45 111.1H19.4502Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M17.1001 129.9V111.1H115.8V129.9H17.1001Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M26.5 99.35V38.25H106.4V99.35H26.5Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M26.4999 38.25L12.3999 26.5H120.5L106.4 38.25H26.4999Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M12.3999 26.5V3H31.1999V12.4H54.6999V3H78.1999V12.4H101.7V3H120.5V26.5H12.3999Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M17.1001 127.55H115.8'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                  <path
                    d='M21.7998 108.75H111.1'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                  <path
                    d='M26.5 99.35H106.4'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                  <path
                    d='M26.5 38.25H106.4'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                  <path
                    d='M12.3999 26.5H120.5'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                </g>
              )}
              <defs>
                <clipPath id='clip0_101_107'>
                  <rect width='133' height='147' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div
          className='h-[25%] w-full flex justify-center'
          onClick={() => dispatchPiecePromotion(3)}
        >
          <div
            className='h-[80%] w-[80%] mx-auto my-auto'
            onClick={() => dispatchPiecePromotion(3)}
          >
            <svg
              width={`${boxRef.current?.clientWidth}`}
              height={`${boxRef.current?.clientHeight}`}
              viewBox='0 0 161 163'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {piece.white ? (
                <g clip-path='url(#clip0_101_109)'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M17.1 146.35C33.033 141.791 64.617 148.371 80.55 136.95C96.483 148.371 128.067 141.791 144 146.35C144 146.35 151.755 148.888 158.1 155.75C154.904 160.309 150.345 160.403 144 158.1C128.067 153.541 96.483 160.262 80.55 153.4C64.617 160.262 33.033 153.541 17.1 158.1C10.7362 160.403 6.1819 160.309 3 155.75C9.3638 146.632 17.1 146.35 17.1 146.35Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M45.3001 127.55C57.0501 139.3 104.05 139.3 115.8 127.55C118.15 120.5 115.8 118.15 115.8 118.15C115.8 106.4 104.05 99.35 104.05 99.35C129.9 92.3 132.25 45.3 80.5501 26.5C28.8501 45.3 31.2001 92.3 57.0501 99.35C57.0501 99.35 45.3001 106.4 45.3001 118.15C45.3001 118.15 42.9501 120.5 45.3001 127.55Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M92.3 14.75C92.3 17.8663 91.0621 20.855 88.8586 23.0585C86.655 25.2621 83.6663 26.5 80.55 26.5C77.4338 26.5 74.4451 25.2621 72.2415 23.0585C70.038 20.855 68.8 17.8663 68.8 14.75C68.8 11.6337 70.038 8.64505 72.2415 6.4415C74.4451 4.23794 77.4338 3 80.55 3C83.6663 3 86.655 4.23794 88.8586 6.4415C91.0621 8.64505 92.3 11.6337 92.3 14.75V14.75Z'
                    fill='white'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M57.05 99.35H104.05M45.3 118.15H115.8M80.55 50V73.5M68.8 61.75H92.3'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                </g>
              ) : (
                <g clip-path='url(#clip0_101_103)'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M17.1 146.35C33.033 141.791 64.617 148.371 80.55 136.95C96.483 148.371 128.067 141.791 144 146.35C144 146.35 151.755 148.888 158.1 155.75C154.904 160.309 150.345 160.403 144 158.1C128.067 153.541 96.483 160.262 80.55 153.4C64.617 160.262 33.033 153.541 17.1 158.1C10.7362 160.403 6.1819 160.309 3 155.75C9.3638 146.632 17.1 146.35 17.1 146.35Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M45.3001 127.55C57.0501 139.3 104.05 139.3 115.8 127.55C118.15 120.5 115.8 118.15 115.8 118.15C115.8 106.4 104.05 99.35 104.05 99.35C129.9 92.3 132.25 45.3 80.5501 26.5C28.8501 45.3 31.2001 92.3 57.0501 99.35C57.0501 99.35 45.3001 106.4 45.3001 118.15C45.3001 118.15 42.9501 120.5 45.3001 127.55Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M92.3 14.75C92.3 17.8663 91.0621 20.855 88.8586 23.0585C86.655 25.2621 83.6663 26.5 80.55 26.5C77.4338 26.5 74.4451 25.2621 72.2415 23.0585C70.038 20.855 68.8 17.8663 68.8 14.75C68.8 11.6337 70.038 8.64505 72.2415 6.4415C74.4451 4.23794 77.4338 3 80.55 3C83.6663 3 86.655 4.23794 88.8586 6.4415C91.0621 8.64505 92.3 11.6337 92.3 14.75V14.75Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M57.05 99.35H104.05M45.3 118.15H115.8M80.55 50V73.5M68.8 61.75H92.3'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                  />
                </g>
              )}
              <defs>
                <clipPath id='clip0_101_109'>
                  <rect width='161' height='163' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div
          className='h-[25%] w-full flex justify-center'
          onClick={() => dispatchPiecePromotion(4)}
        >
          <div
            className='h-[80%] w-[80%] mx-auto my-auto'
            onClick={() => dispatchPiecePromotion(4)}
          >
            <svg
              width={`${boxRef.current?.clientWidth}`}
              height={`${boxRef.current?.clientHeight}`}
              viewBox='0 0 157 156'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {piece.white ? (
                <g clip-path='url(#clip0_101_108)'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M78.2 17.1001C127.55 21.8001 155.75 54.7001 153.4 153.4H45.3C45.3 111.1 92.3 122.85 82.9 54.7001'
                    fill='white'
                  />
                  <path
                    d='M78.2 17.1001C127.55 21.8001 155.75 54.7001 153.4 153.4H45.3C45.3 111.1 92.3 122.85 82.9 54.7001'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M87.6 54.7C89.386 68.377 61.515 89.339 50 97C35.9 106.4 36.746 117.398 26.5 115.8C21.6026 111.382 33.127 101.512 26.5 101.7C21.8 101.7 27.393 107.481 21.8 111.1C17.1 111.1 2.98591 115.8 3.00001 92.3C3.00001 82.9 31.2 35.9 31.2 35.9C31.2 35.9 40.083 26.97 40.6 19.45C37.169 14.7782 38.25 10.05 38.25 5.35C42.95 0.65 52.35 17.1 52.35 17.1H61.75C61.75 17.1 65.416 7.7376 73.5 3C78.2 3 78.2 17.1 78.2 17.1'
                    fill='white'
                  />
                  <path
                    d='M87.6 54.7C89.386 68.377 61.515 89.339 50 97C35.9 106.4 36.746 117.398 26.5 115.8C21.6026 111.382 33.127 101.512 26.5 101.7C21.8 101.7 27.393 107.481 21.8 111.1C17.1 111.1 2.98591 115.8 3.00001 92.3C3.00001 82.9 31.2 35.9 31.2 35.9C31.2 35.9 40.083 26.97 40.6 19.45C37.169 14.7782 38.25 10.05 38.25 5.35C42.95 0.65 52.35 17.1 52.35 17.1H61.75C61.75 17.1 65.416 7.7376 73.5 3C78.2 3 78.2 17.1 78.2 17.1'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M19.45 89.9501C19.45 90.5734 19.2024 91.1711 18.7617 91.6118C18.321 92.0525 17.7233 92.3001 17.1 92.3001C16.4767 92.3001 15.879 92.0525 15.4383 91.6118C14.9976 91.1711 14.75 90.5734 14.75 89.9501C14.75 89.3268 14.9976 88.7291 15.4383 88.2884C15.879 87.8477 16.4767 87.6001 17.1 87.6001C17.7233 87.6001 18.321 87.8477 18.7617 88.2884C19.2024 88.7291 19.45 89.3268 19.45 89.9501Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M44.9851 44.125C44.0503 45.7442 42.9392 47.1733 41.8965 48.0979C40.8538 49.0225 39.9648 49.3669 39.425 49.0553C38.8853 48.7436 38.739 47.8015 39.0185 46.4362C39.2979 45.0709 39.9801 43.3942 40.9149 41.775C41.8498 40.1558 42.9608 38.7266 44.0036 37.802C45.0463 36.8774 45.9353 36.533 46.475 36.8447C47.0148 37.1563 47.161 38.0984 46.8816 39.4637C46.6022 40.8291 45.92 42.5058 44.9851 44.125V44.125Z'
                    fill='black'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </g>
              ) : (
                <g clip-path='url(#clip0_101_104)'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M78.2 17.1C127.55 21.8 155.75 54.7 153.4 153.4H45.3C45.3 111.1 92.3 122.85 82.9 54.7'
                    fill='black'
                  />
                  <path
                    d='M78.2 17.1C127.55 21.8 155.75 54.7 153.4 153.4H45.3C45.3 111.1 92.3 122.85 82.9 54.7'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M87.6 54.7C89.386 68.377 61.515 89.339 50 97C35.9 106.4 36.746 117.398 26.5 115.8C21.6026 111.382 33.127 101.512 26.5 101.7C21.8 101.7 27.393 107.481 21.8 111.1C17.1 111.1 2.98591 115.8 3.00001 92.3C3.00001 82.9 31.2 35.9 31.2 35.9C31.2 35.9 40.083 26.97 40.6 19.45C37.169 14.7782 38.25 10.05 38.25 5.35C42.95 0.65 52.35 17.1 52.35 17.1H61.75C61.75 17.1 65.416 7.7376 73.5 3C78.2 3 78.2 17.1 78.2 17.1'
                    fill='black'
                  />
                  <path
                    d='M87.6 54.7C89.386 68.377 61.515 89.339 50 97C35.9 106.4 36.746 117.398 26.5 115.8C21.6026 111.382 33.127 101.512 26.5 101.7C21.8 101.7 27.393 107.481 21.8 111.1C17.1 111.1 2.98591 115.8 3.00001 92.3C3.00001 82.9 31.2 35.9 31.2 35.9C31.2 35.9 40.083 26.97 40.6 19.45C37.169 14.7782 38.25 10.05 38.25 5.35C42.95 0.65 52.35 17.1 52.35 17.1H61.75C61.75 17.1 65.416 7.7376 73.5 3C78.2 3 78.2 17.1 78.2 17.1'
                    stroke='black'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M19.45 89.95C19.45 90.5732 19.2024 91.171 18.7617 91.6117C18.321 92.0524 17.7233 92.3 17.1 92.3C16.4767 92.3 15.879 92.0524 15.4383 91.6117C14.9976 91.171 14.75 90.5732 14.75 89.95C14.75 89.3267 14.9976 88.729 15.4383 88.2883C15.879 87.8476 16.4767 87.6 17.1 87.6C17.7233 87.6 18.321 87.8476 18.7617 88.2883C19.2024 88.729 19.45 89.3267 19.45 89.95Z'
                    fill='white'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M44.9851 44.125C44.0503 45.7442 42.9392 47.1733 41.8965 48.0979C40.8538 49.0225 39.9648 49.3669 39.425 49.0553C38.8853 48.7436 38.739 47.8015 39.0185 46.4362C39.2979 45.0709 39.9801 43.3942 40.9149 41.775C41.8498 40.1558 42.9608 38.7266 44.0036 37.802C45.0463 36.8774 45.9353 36.533 46.475 36.8447C47.0148 37.1563 47.161 38.0984 46.8816 39.4637C46.6022 40.8291 45.92 42.5058 44.9851 44.125V44.125Z'
                    fill='white'
                    stroke='white'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M90.1851 18.98L88.0701 25.795L90.4201 26.5C105.225 31.2 116.975 38.203 127.55 58.225C138.125 78.247 142.825 106.682 140.475 153.4L140.24 155.75H150.815L151.05 153.4C153.4 106.118 146.914 74.205 135.775 53.102C124.636 31.999 108.562 21.894 92.5821 19.45L90.1851 18.98Z'
                    fill='white'
                  />
                </g>
              )}
              <defs>
                <clipPath id='clip0_101_108'>
                  <rect width='157' height='156' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PiecePromoter;
