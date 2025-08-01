import User from "../models/User.js";        
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // DEBUG HEADER
        if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
            console.log("Missing headers:", headers);
            return res.status(400).json({ success: false, message: "Missing required headers" });
        }

        // VERIFY
        const payload = JSON.stringify(req.body);
        const evt = await whook.verify(payload, headers);

        const { data, type } = evt;
        console.log("📩 Webhook type:", type);
        console.log("📦 Webhook data:", data);

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0]?.email_address,
                    username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    image: data.image_url,
                };

                const created = await User.create(userData);
                console.log("✅ User created in MongoDB:", created);
                break;
            }

            case "user.updated": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0]?.email_address,
                    username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    image: data.image_url,
                };
                const updated = await User.findByIdAndUpdate(data.id, userData, { new: true });
                console.log("🔁 User updated:", updated);
                break;
            }

            case "user.deleted": {
                const deleted = await User.findByIdAndDelete(data.id);
                console.log("🗑️ User deleted:", deleted);
                break;
            }

            default:
                console.log(`⚠️ Unhandled webhook type: ${type}`);
        }

        res.status(200).json({ success: true, message: "Webhook received" });

    } catch (error) {
        console.error("❌ Webhook error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default clerkWebhooks;
