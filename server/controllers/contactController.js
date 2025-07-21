const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Finds all mutual contacts for given user
const findMutuals = async (userId) => {
    const contacts = await prisma.user.findMany({
      where: {
        AND: [
          {
            // Users who I have as a contact
            contacts: {
              some: { id: userId }
            }
          },
          {
            // Users who have me as a contact
            contactOf: {
              some: { id: userId }
            }
          }
        ]
      },
      select: { id: true, username: true, email: true }
    });
  return contacts
}

// Finds all outgoing (pending) contacts for user
const findPending = async (userId) => {
  const contacts = await prisma.user.findMany({
    where: {
      AND: [
        {
          // Users who I have as a contact
          contacts: {
            none: { id: userId }
          }
        },
        {
          // Users who DON'T have me a a contact
          contactOf: {
            some: { id: userId }
          }
        }
      ]
    },
    select: { id: true, username: true, email: true }
  });
  return contacts;
} 

// Add a contact (make user1 a contact of user2)
const addContact = async (req, res) => {
  try {
    let { email, username, contactId } = req.body; // or req.params
    const userId = req.user?.id;
    
    // IF user passes email or username instead of an ID (for search usually)
    if (!contactId) {
      var contact;
      if (email) {
        contact = await prisma.user.findUnique({
          where: {
            email
          }
        })
      } else if (username) {
        contact = await prisma.user.findUnique({
          where: {
            username
          },
          select: { email: true, username: true, contactId: true }
        })
        
      } else {
          return res.status(400).json({
          success: false,
          message: "email or username is required"
        });
      }
      contactId = contact.id;
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User authentication failed"
      });
    }
    
    // Add the contact relationship
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        contacts: {
          connect: { id: contactId }
        }
      },
      include: {
        contacts: {
          select: { id: true, username: true, email: true }
        }
      }
    });

    console.log("Updated user: ", updatedUser);
    if (!updatedUser) {
        return res.status(400).json({
          success: false,
          message: "User update failed"
        }); 
    }

    const mutuals = await findMutuals(userId);
    const pending = await findPending(userId);
    console.log('mutuals: ', mutuals)
    console.log('pending: ', pending);

    res.status(200).json({
      success: true,
      message: "Contact added successfully",
      data: { mutuals, pending }
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

const getContacts = async (req, res) => {
  try {
    const userId = req.user?.id;
    const mutuals = await findMutuals(userId);
    const pending = await findPending(userId);

    res.status(200).json({
      success: true,
      data: { mutuals, pending }
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

// Get all PENDING (requests) contacts for a user
const getPending = async (req, res) => {
  try {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        contactOf: {
          select: { id: true, username: true, email: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: user.contactOf
    });

  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
      error: error.message,
    });
  }
}

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

const removeContactPending = async (req, res) => {
  try {
    const { contactId } = req.body;
    const userId = req.user?.id;

    await prisma.user.update({
      where: { id: contactId },
      data: {
        contacts: {
          disconnect: { id: parseInt(userId) }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Contact request removed successfully"
    });

  } catch (error) {
    console.error("Error removing requested contact:", error);
    res.status(500).json({
      success: false,
      message: "Error removing contact request",
      error: error.message,
    });
  }
};

module.exports = {
  addContact,
  getContacts,
  getPending,
  removeContact,
  removeContactPending,
};