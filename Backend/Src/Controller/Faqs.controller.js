import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { FAQS } from "../Models/Faqs.model.js";





const askQuestion = asyncHandler(async (req, res) => {
  const { name, email, question } = req.body;

  if (!name?.trim()) {
    
    throw new ApiError(400, "Name is required");
}
  if (!email?.trim()){
    
    throw new ApiError(400, "Email is required")

};
  if (!question?.trim()){ 

    throw new ApiError(400, "Question is required");
}

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    
    throw new ApiError(400, "Invalid email format");

}

  const faq = await FAQS.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    question: question.trim(),
    status: "Pending",
  });


  return res
    .status(201)
    .json(new ApiResponse(201, faq, "Your question has been received!"));
});



 const getAllQuestions = asyncHandler(async (req, res) => {
  const status = req.query.status;
  const filter = status ? { status } : {};

  const faqs = await FAQS.find(filter).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, faqs, "Questions fetched successfully"));
});



const answerQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  if (!answer?.trim()) {
    
    throw new ApiError(400, "Answer is required");

  }
  
  const faq = await FAQS.findById(id);
  if (!faq) {
    
    throw new ApiError(404, "Question not found");

  }

  faq.answer = answer.trim();
  faq.status = "Answered";
  await faq.save();

  return res
    .status(200)
    .json(new ApiResponse(200, faq, "Answer added successfully"));
});


export {askQuestion,getAllQuestions,answerQuestion}