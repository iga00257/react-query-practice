import FormModal from '../../components/Modal/FormModal'
import InputText from '../../components/Input/InputText'
import { useState } from 'react'
import Button from '../../components/button'

function Modals () {
  const [modalState, setModalState] = useState(false)

  const savenewIssue = () => {
    console.log()
    // to be defined
  }

  const updateFormValue = () => {}
  return <>
  <Button onClick={() => { setModalState(true) }}>Click to open Modal</Button>
  <FormModal
    title={'FormModal title '}
    open={modalState}
    onClose={() => {
      setModalState(false)
    }}
    onSave={() => {
      savenewIssue()
      setModalState(false)
    }}
  >
    <InputText
      type="text"
      updateType="text"
      containerStyle="mt-4 w-2/3"
      labelTitle="Issue Name"
      updateFormValue={updateFormValue}
    />
  </FormModal>
  </>
}
export default Modals
