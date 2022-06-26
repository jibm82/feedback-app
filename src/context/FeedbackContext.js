import { createContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import FeedbackData from "../data/FeedbackData"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState(FeedbackData)

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  return <FeedbackContext.Provider value={{
    feedback,
    addFeedback,
    deleteFeedback,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext
