"use client"

import { useStore } from '../../util/store'
import Button from '../UI/button'
import Modal from '../UI/modal'

const Error = () => {
  const { error, dispatch } = useStore()

  return (
    <Modal
      className="rounded-sm"
      isActive={error.error}
      onClose={() =>
        dispatch({
          type: 'SET_ERROR',
          value: false,
          message: '',
        })
      }
    >
      <p className="text-red-500 font-medium text-lg text-center">
        {error.message}
      </p>
      <Button
        className="w-36 h-12 bg-dark mb-12"
        onClick={() =>
          dispatch({
            type: 'SET_ERROR',
            value: false,
            message: '',
          })
        }
      >
        OK
      </Button>
    </Modal>
  )
}

export default Error
