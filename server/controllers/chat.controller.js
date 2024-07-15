import ChatModel from "../models/Chat.js";

export const createChat = async (req, res, next) => {
	const { firstId, secondId } = req.body;

	if (!firstId || !secondId) return res.status(400).json({ success: false, message: "sender and receiver both id needed." });

	try {
		const chat = await ChatModel.findOne({
			members: { $all: [firstId, secondId] },
		});

		if (chat) return res.status(200).json({ success: true, ...chat });

		const newChat = new ChatModel({
			members: [firstId, secondId],
		});

		const resp = await newChat.save();

		res.status(201).json({ success: true, ...resp });
	} catch (error) {
		res.status(500).json({ success: false, message: "Couldn't create chat." });
	}
};

export const allUserChats = async (req, res) => {
	const userId = req.params.userId;

	try {
		const chats = ChatModel.find({
			members: { $in: [userId] },
		});

		res.status(200).json({ success: true, data: chats });
	} catch (error) {
		res.status(500).json({ success: false, message: "Error during retreiving chats" });
	}
};

export const findChat = async (req, res) => {
	const { firstId, secondId } = req.params;

	try {
		const chat = ChatModel.find({
			members: { $all: [firstId, secondId] },
		});

		res.status(200).json({ success: true, ...chat });
	} catch (error) {
		res.status(500).json({ success: false, message: "Error during retreiving chats" });
	}
};
