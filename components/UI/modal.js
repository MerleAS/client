const Modal = ({ onClose, children, isActive }) => {
  return (
    <>
      {isActive && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full z-20 bg-stone-800/5 backdrop-blur-[2px] flex"
            onClick={onClose}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-2xl z-30 w-64 md:w-80 lg:w-96 rounded-sm border border-dark/5">
            <div className="flex flex-col items-center justify-center space-y-4">
              {children}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Modal
