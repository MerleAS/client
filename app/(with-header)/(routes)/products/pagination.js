import Link from 'next/link'

export const Pagination = ({ page, totalPages }) => {
  return (
    <div className='w-full flex items-center justify-center space-x-8'>
      <Link href={`/products?page=${parseInt(page) - 1}`} className={`w-24 h-12 bg-dark text-white flex items-center justify-center rounded-md ${parseInt(page) > 1 ? "hover:opacity-70" : "pointer-events-none"}`}>Forrige</Link>
      <Link href={`/products?page=${parseInt(page) + 1}`} className={`w-24 h-12 bg-dark text-white flex items-center justify-center rounded-md ${parseInt(page) < totalPages ? "hover:opacity-70" : "pointer-events-none"}`}>Neste</Link>
    </div>
  )
}

export default Pagination
