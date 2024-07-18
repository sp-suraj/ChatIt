import MessageModel from "../models/Message.js";

// Create Message

export const createMessage = async (req, res) => {
	const { chatId, senderId, text } = req.body;

	const messageDoc = new MessageModel({ chatId, senderId, text });

	try {
		const resp = await messageDoc.save();
		res.status(200).json({ success: true, ...resp });
	} catch (error) {
		res.status(400).json({ suucess: false, message: "Failed tp send message" });
	}
};

// Get Messages
export const getMessage = async (req, res) => {
	const { chatId } = req.params;
	try {
		let messages = await MessageModel.find({ chatId });
		res.status(200).json({ success: true, data: messages });
	} catch (error) {
		res.status(400).json({ suucess: false, message: "No chat found" });
	}
};
