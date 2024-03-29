import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import ReactModal from 'react-modal'

const Modal = ({ content, isOpenModal, changeModalState }) => {
  return (
    <>
      <ReactModal
        isOpen={isOpenModal}
        ariaHideApp={false}
        contentLabel="Minimal Modal Example"
        style={{
          overlay: {
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            zIndex: 999,
          },
          content: {
            alignContent: 'center',
            alignItems: 'center',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <IconButton
          margin="normal"
          onClick={changeModalState}
          sx={{ position: 'fixed', top: '10px', right: '10px' }}
          aria-label="add"
        >
          <Close />
        </IconButton>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>{content}</div>
      </ReactModal>
    </>
  )
}

export default Modal
