import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  useTLS: false,
});

export default async function handler(req, res) {
  const { message, type, sender } = req.body;
  const response = await pusher.trigger("notification-service", "notification-event", {
    sender: sender,
    message: message,
    type: type,
  });

  res.json({ message: "completed" });
}