export const Skeleton = () => {
  return (
    <>
      <div className="grid gap-y-4 md:gap-4 grid-cols-1 md:grid-cols-2 md:grid-rows-2">
        <div className="col-span-1 row-span-2">
          <div className="rounded-lg border border-white border-opacity-20 h-[740px] p-4">
            <div className="rounded-lg skeleton h-6 w-20" />
            <div className="rounded-lg skeleton h-1/2 w-full mt-4" />
            <div className="rounded-lg skeleton h-2/5 w-full mt-4" />
          </div>
        </div>
        <div className="col-span-1">
          <div className="rounded-lg border border-white border-opacity-20  p-4 h-[362px]">
            <div className="rounded-lg skeleton h-6 w-20" />
            <div className="rounded-lg skeleton h-5/6 w-full mt-4" />
          </div>
        </div>
        <div className="col-span-1">
          <div className="rounded-lg border border-white border-opacity-20  p-4 h-[362px]">
            <div className="rounded-lg skeleton h-6 w-20" />
            <div className="rounded-lg skeleton h-5/6 w-full mt-4" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Skeleton
