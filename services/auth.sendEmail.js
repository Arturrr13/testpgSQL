"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "camyrauu911@gmail.com",
        pass: "vush xtbb uhnt mnyp",
    }
});
const sendEmail = async (email, id, req) => {
    const info = await transporter.sendMail({
        from: '"Sign Up 👻" <camyrauu911@gmail.com>',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `
            <div>
                <b>Hello!!!</b><bt>
                <h1>
                    <a href="${req.protocol + "://" + req.headers.host}/api/auth/activate/${id}">
                        Activate your account
                    </a>
                </h1>
            </div>
        `
    });
    console.log("Message sent: %s", info.messageId);
};
exports.sendEmail = sendEmail;
//main().catch(console.error);
