const catchErrors = (error, displayError) => {
  let errorMsg
  if (error.response) {
    // the request was made and the server responded with the status code that is not in a range of 2XX
    errorMsg = error.response.data
    console.error('Error response', errorMsg)

    // for Cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message
    }
  } else if (error.request) {
    // The request was made but no response was received
    errorMsg = error.request
    console.error('Error request', errorMsg)
  } else {
    // sth else happened
    errorMsg = error.message
    console.error('Error message', errorMsg)
  }
  displayError(errorMsg)
}

export default catchErrors