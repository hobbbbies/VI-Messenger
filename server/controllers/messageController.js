const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Get all posts
const getAllMessages = async (req, res) => {
  try {
    const { contactId } = req.params
    parsedContactId = parseInt(contactId);
    const userId = req.user?.id
    if (parsedContactId === userId) throw new Error("Cannot view messages with self");
    const messages = await prisma.message.findMany({
      where: {
        contactId: parsedContactId,
        userId
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    });
  }
};

const createMessage = async (req, res) => {
  try {
    const { content, contactId } = req.body;
    const userId = parseInt(req.user?.id);

    console.log('userId: ', userId);
    console.log("content", content);
    console.log('contactId: ', contactId);

    if (!content || !contactId) {
      return res
        .status(400)
        .json({ sucess: false, message: "content or contactId missing from request body" });
    }

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId verification failed." });
    }

    const message = await prisma.message.create({
      data: {
        content,
        userId,
        contactId: parseInt(contactId),
      },
    });

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating message",
      error: error.message,
    });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const messageId = parseInt(req.params.messageId);
    const userId = parseInt(req.user.id);
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message || !content) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found." });
    }

    if (message.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "User not authorized to update this message.",
      });
    }

    const update = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        content: content,
      },
    });
    res.status(200).json({
      success: true,
      data: update,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating message",
      error: error.message,
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const messageId = parseInt(req.params.messageId);
    const userId = parseInt(req.user.id);

    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message || !content) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found." });
    }

    if (message.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "User not authorized to delete this message.",
      });
    }

    const deleteMessage = await prisma.post.delete({
      where: {
        id: messageId,
      },
    });
    res.status(200).json({
      success: true,
      data: deleteMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting message",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMessages,
  createMessage,
  updateMessage,
  deleteMessage,
};
