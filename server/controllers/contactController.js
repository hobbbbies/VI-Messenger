const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Add a contact (make user1 a contact of user2)
const addContact = async (req, res) => {
  try {
    const { contactId } = req.body; // or req.params
    const userId = req.user?.id;

    if (!contactId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Contact ID is required"
      });
    }

    // Check if contact exists
    const contactUser = await prisma.user.findUnique({
      where: { id: parseInt(contactId) }
    });

    if (!contactUser) {
      return res.status(404).json({
        success: false,
        message: "Contact user not found"
      });
    }

    // Add the contact relationship
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        contacts: {
          connect: { id: parseInt(contactId) }
        }
      },
      include: {
        contacts: {
          select: { id: true, username: true, email: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Contact added successfully",
      data: updatedUser.contacts
    });

  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({
      success: false,
      message: "Error adding contact",
      error: error.message,
    });
  }
};

// Get all contacts for a user
const getContacts = async (req, res) => {
  try {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        contacts: {
          select: { id: true, username: true, email: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: user.contacts
    });

  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
      error: error.message,
    });
  }
};

// Remove a contact
const removeContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    const userId = req.user?.id;

    await prisma.user.update({
      where: { id: userId },
      data: {
        contacts: {
          disconnect: { id: parseInt(contactId) }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Contact removed successfully"
    });

  } catch (error) {
    console.error("Error removing contact:", error);
    res.status(500).json({
      success: false,
      message: "Error removing contact",
      error: error.message,
    });
  }
};

module.exports = {
  addContact,
  getContacts,
  removeContact,
};