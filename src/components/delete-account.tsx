import React, { useState } from 'react';
import { z } from 'zod';
import Swal from 'sweetalert2'; 

// Array of reasons for deleting account
const reasons = [
  "I have privacy concerns.",
  "I no longer find this useful.",
  "I'm receiving irrelevant email contents.",
  "I'm getting too many emails.",
  "Others"
];

const schema = z.object({
  comment: z.string().max(2000),
  selectedReasons: z.array(z.number()).min(1),
});

const Delete: React.FC = () => {
  const [comment, setComment] = useState<string>(""); // State variable for comment
  const [commentError, setCommentError] = useState<boolean>(false); 
  const [selectedReasons, setSelectedReasons] = useState<number[]>([]); 

  // Function to handle changes in the comment input
  const handleCommentChange = (e: { target: { value: any; }; }) => {
    const text = e.target.value;
    setCommentError(text.length > 2000); // Check if comment exceeds 2000 characters
    setComment(text);
  };

  // Function to handle changes in the selected reasons
  const handleReasonChange = (index: number) => {
    const newSelectedReasons = [...selectedReasons];
    // Toggle selection of reasons
    if (newSelectedReasons.includes(index)) {
      newSelectedReasons.splice(newSelectedReasons.indexOf(index), 1); // Remove reason if already selected
    } else {
      newSelectedReasons.push(index); // Add reason if not selected
    }
    setSelectedReasons(newSelectedReasons); // Update selected reasons state
  };

  // Function to handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    const result = schema.safeParse({ comment, selectedReasons });
    if (!result.success) {
      // Display error message
      Swal.fire({
        icon: 'error',
        text: result.error.errors.map((err) => err.message).join(', '),
        showConfirmButton: false, 
        timer: 5000
      });
    } else {
      // Display success message
      Swal.fire({
        icon: 'success',
        title: 'Account successfully destroyed', 
        showConfirmButton: false,
        timer: 1500 
      });
  
      console.log("Comment:", comment);
      console.log("Selected Reasons:", selectedReasons.map(index => reasons[index]));
    }
  };
  

  // JSX for Delete component
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-3xl shadow">
      <h1 className="text-center text-xl" style={{ color: "#0072B5" }}>
        <strong>Delete Your Account</strong>
      </h1>
      <p className="my-5">We're sorry to see you go. It would be great if we could know the reason behind.</p>
      {/* Form for account deletion */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="my-5">
          <div className="mb-5 text-sm text-red-600 dark:text-red-500">
            <i className="bi bi-exclamation-triangle-fill pe-2"></i>
            <span>Please select one of the below reasons.</span>
          </div>
          {/* Checkbox inputs for selecting reasons */}
          {reasons.map((reason, index) => (
            <div className="flex items-center mb-3" key={index}>
              <input
                type="checkbox"
                id={`reason-${index}`}
                checked={selectedReasons.includes(index)}
                onChange={() => handleReasonChange(index)}
                className="mr-2 appearance-none rounded-full border border-gray-300 w-5 h-5 checked:bg-blue-600 checked:border-transparent"
              />
              <label htmlFor={`reason-${index}`}>{reason}</label>
            </div>
          ))}
        </div>

        <div className="my-5">
          {/* Textarea for entering comments */}
          <label htmlFor="comment" className="block mb-3">Let us know if you have any other comments.</label>
          <textarea
            id="comment"
            rows={7}
            value={comment}
            onChange={handleCommentChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your comments (Optional)"
          ></textarea>
          {/* Error message for comment length */}
          {commentError && <p className="text-red-500 text-sm my-2">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Comment should not exceed 2000 characters.
          </p>}
          <p className="text-gray-400 text-sm text-right my-3">Max. 2000 characters</p>
        </div>

        <div className="mb-5">
          {/* Submit button */}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            style={{ background: "#0072B5" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Delete;
