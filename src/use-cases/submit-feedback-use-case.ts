import { FeedbackRepository } from '../repositories/feedbacks-repository'
import { MailAdapter } from '../adapters/mail-adapter'

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbackRepository: FeedbackRepository,
        private mailAdapter: MailAdapter
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request
        let body

        if (!type) {
            throw new Error("Type is required.")
        }

        if (!comment) {
            throw new Error("Comment is required.")
        }

        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid screenshot format!")
        }

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        body = [
            `<div style="font-family: sans-serif; font-size:13px; color: #111;">`,
            `<h3> Feedback Information Below: </h3>`,
            `<p> Type: <strong> ${type} </strong> </p>`,
            `<p> Comment: <strong> ${comment} </strong> </p>`,
            `<p> Screen print: <br><br> <img src="${screenshot}" width="400px" height="400px"/> </p>`,
            `<br><br> <i> Submitted by Widget Application. </i>`,
            `</div>`,
        ].join('\n')

        if (!screenshot || screenshot === "data:image/png;base64, null") {
            body = body.replace(/<br>.*\/>/gi, '[without image attachment]')
        }

        await this.mailAdapter.sendMail({
            subject: `[${type.toUpperCase()}] - New feedback`,
            body: body
        })

        console.log(`\nFeedback and email successfully submitted. Everything OK!`)
    }
}
