const Design = () => {
  const a = Array.from(Array(8).keys());
  return (
    <div className='container mx-auto px-4'>
      <div className='w-1/3 m-auto'>
        <div className='grid grid-cols-8 grid-rows-8'>
          {a.map((j) => {
            return a.map((e) => (
              <div
                className={`aspect-square  ${
                  j % 2 === 0
                    ? e % 2 === 0
                      ? "bg-slate-400"
                      : "bg-stone-200"
                    : e % 2 !== 0
                    ? "bg-slate-400"
                    : "bg-stone-200"
                }`}
              ></div>
            ));
          })}
        </div>
      </div>
    </div>
  );
};
export default Design;
