import { createContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import FeedbackData from "../data/FeedbackData"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState(FeedbackData)
  const [feedbackEdit, setFeedbackEdit] = useState({item: {}, edit: false})

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const updateFeedback = (updatedFeedback) => {
    setFeedback(feedback.map((item) => {
      if(item.id === feedbackEdit.item.id) {
        return {...item, ...updatedFeedback};
      }

      return item;
    }))

    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  return <FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
    addFeedback,
    deleteFeedback,
    editFeedback,
    updateFeedback,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext
