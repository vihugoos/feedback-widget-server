import { SubmitFeedbackUseCase } from './submit-feedback-use-case'

const createFeedbackSpy = jest.fn()
const sendMail = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMail }
)

describe("Submit feedback", () => {

    // Test 1 
    it('Should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example comment",
            screenshot: "data:image/png;base64,image"
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMail).toHaveBeenCalled()
    })

    // Test 2
    it('Should be able to submit a feedback without a screenshot', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example comment",
            screenshot: "data:image/png;base64, null"
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMail).toHaveBeenCalled()
    })

    // Test 3 
    it('Should NOT be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "Example comment",
            screenshot: "data:image/png;base64,image"
        })).rejects.toThrow()
    })

    // Test 4
    it('Should NOT be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64,image"
        })).rejects.toThrow()
    })

    // Test 5
    it('Should NOT be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example comment",
            screenshot: "anything"
        })).rejects.toThrow()
    })

})
