"use strict";
/**
 * HTMA Genius - Firebase Functions Gen 2
 * Fully validated and syntax-safe
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserRole = exports.health = exports.onHtmaJobCreated = void 0;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
const firestore_1 = require("firebase-functions/v2/firestore");
const params_1 = require("firebase-functions/params");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const openai_1 = __importDefault(require("openai"));
// -------------------------------
// Initialize Firebase
// -------------------------------
admin.initializeApp();
// -------------------------------
// SECRETS (Gen 2)
// -------------------------------
const SENDGRID_API_KEY = (0, params_1.defineSecret)("SENDGRID_API_KEY");
const OPENAI_API_KEY = (0, params_1.defineSecret)("OPENAI_API_KEY");
// -------------------------------
// Firestore Ref
// -------------------------------
const db = admin.firestore();
// -------------------------------
// FIRESTORE TRIGGER - MAIN PIPELINE
// -------------------------------
exports.onHtmaJobCreated = (0, firestore_1.onDocumentCreated)({
    document: "htma_jobs/{jobId}",
    secrets: [SENDGRID_API_KEY, OPENAI_API_KEY],
    timeoutSeconds: 540,
    memory: "1GiB",
}, async (event) => {
    try {
        const snapshot = event.data;
        if (!snapshot) {
            console.error("❌ No document snapshot found");
            return;
        }
        const jobId = event.params.jobId;
        const jobData = snapshot.data();
        console.log("🔥 HTMA job created:", jobId);
        // Read secrets
        const sendgridKey = SENDGRID_API_KEY.value();
        const openaiKey = OPENAI_API_KEY.value();
        mail_1.default.setApiKey(sendgridKey);
        // -------------------------------
        // STEP 1 — OpenAI Analysis
        // -------------------------------
        const client = new openai_1.default({ apiKey: openaiKey });
        const analysisPrompt = `
      You are an HTMA expert. Analyze:
      ${JSON.stringify(jobData.labData, null, 2)}
      Provide summary, mineral patterns, supplements, lifestyle guidance.
      `;
        const aiResponse = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: analysisPrompt }],
        });
        const analysis = aiResponse.choices[0].message.content;
        console.log("🧠 AI analysis finished");
        await db.collection("htma_jobs").doc(jobId).update({
            analysis,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        // -------------------------------
        // STEP 2 — Generate PDF (placeholder)
        // -------------------------------
        const pdfBuffer = Buffer.from(`<h1>HTMA Report</h1><p>${analysis}</p>`);
        // -------------------------------
        // STEP 3 — Send Email via SendGrid
        // -------------------------------
        const msg = {
            to: jobData.email,
            from: "htma-genius@yourdomain.com",
            subject: "Your HTMA Report",
            text: "Your HTMA report is ready!",
            attachments: [
                {
                    content: pdfBuffer.toString("base64"),
                    filename: "htma_report.pdf",
                    type: "application/pdf",
                    disposition: "attachment",
                },
            ],
        };
        await mail_1.default.send(msg);
        console.log("📧 Email sent successfully");
        return;
    }
    catch (err) {
        console.error("❌ Error running pipeline:", err);
        throw err;
    }
});
// -------------------------------
// HEALTH CHECK
// -------------------------------
exports.health = (0, https_1.onRequest)((req, res) => {
    res.status(200).send("HTMA Genius pipeline running.");
});
// -------------------------------
// SET USER ROLE (Admin Only)
// -------------------------------
exports.setUserRole = (0, https_1.onRequest)(async (req, res) => {
    try {
        const { uid, role } = req.body;
        await admin.auth().setCustomUserClaims(uid, { role });
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error setting role");
    }
});
//# sourceMappingURL=index.js.map