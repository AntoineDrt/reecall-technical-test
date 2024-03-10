import { type IEmailRepository } from "../../application/interfaces/email.repository";

export class EmailRepository implements IEmailRepository {
  public async send(text: string, email: string): Promise<void> {
    console.log(`
      Email sent to: ${email}
      Content: ${text}
    `)
  }

  public async broadcast(text: string, emailList: string[]): Promise<void> {
    const emailsToSend = emailList.map(async e => this.send(text, e))

    await Promise.all(emailsToSend)
  }

}