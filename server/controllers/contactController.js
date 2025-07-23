const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// @desc    Finds all mutual contacts for given user
const findMutuals = async (userId) => {
  const contacts = await prisma.user.findMany({
    where: {
      AND: [
        {
          // Users who I have as a contact
          contacts: { some: { id: userId } }
        },
        {
          // Users who have me as a contact
          contactOf: { some: { id: userId } }
        }
      ]
    },
    select: { id: true, username: true, email: true }
  });
  return contacts;
};

// @desc    Finds all outgoing (pending) contacts for user
const findPending = async (userId) => {
  const contacts = await prisma.user.findMany({
    where: {
      AND: [
        {
          // Users who DON'T have me as a contact
          contacts: { none: { id: userId } }
        },
        {
          // Users who I have as a contact
          contactOf: { some: { id: userId } }
        }
      ]
    },
    select: { id: true, username: true, email: true }
  });
  return contacts;
};

// @desc    Add a contact (make user1 a contact of user2)
// @route   POST /contacts
const addContact = async (req, res) => {
  try {
    let { email, username, contactId } = req.body; // or req.params
    const userId = req.user?.id;
    
    // IF user passes email or username instead of an ID
    if (!contactId) {
      let contact;
      if (email) {
        contact = await prisma.user.findUnique({
          where: { email }
        });
      } else if (username) {
        contact = await prisma.user.findUnique({
          where: { username },
          select: { email: true, username: true, id: true }
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "email or username is required",
          error: "email or username is required"
        });
      }
      contactId = contact.id;
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User authentication failed",
        error: "User authentication failed"
      });
    }
    
    // Add the contact relationship (one-way)
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        contacts: { connect: { id: contactId } }
      },
      include: {
        contacts: { select: { id: true, username: true, email: true } }
      }
    });

    console.log("Updated user: ", updatedUser);
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "User update failed",
        error: "User update failed"
      });
    }
    // Remamants of refactoring that I'm saving for 'later'
    // const newUser = updatedUser.contacts.map(() => {
    //   console.log('contacts: ', updatedUser.contacts);
    //   return updatedUser.contacts.some(contact => contact.contacts.id === userId);
    // });

    // console.log('new User: ', newUser); 
    const mutuals = await findMutuals(userId);
    const pending = await findPending(userId);
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
      error: error.message
    });
  }
};

// @desc    Get all contacts for a logged in user
// @route   GET /contacts
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
      error: error.message
    });
  }
};

// @desc    Get all incoming contacts for a logged in user
// @route   GET /contacts/pending
const getPending = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await prisma.user.findUnique({
      where: { id: userId, },
      include: { 
        contactOf: { select: { id: true, username: true, email: true } }, 
        contacts: { select: { id: true, username: true, email: true }  }
    }});

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
        error: "User not found"
      });
    }

    // Filter incoming contacts (contactOf) that are not mutual
    const pendingContacts = user.contactOf.filter(incoming => {
      return !user.contacts.some(mutual => mutual.id === incoming.id);
    });

    res.status(200).json({
      success: true,
      data: pendingContacts
    });

  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
      error: error.message
    });
  }
};

// @desc    delete a given contacts for a logged in user
// @route   DELETE /contacts
const removeContact = async (req, res) => {
  try {
    const { contactId } = req.body;
    const userId = req.user?.id;

    await prisma.user.update({
      where: { id: userId },
      data: {
        contacts: { disconnect: { id: parseInt(contactId) } }
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
      error: error.message
    });
  }
};

// @desc    Delete a given *incoming* contact for a logged in user
// @route   GET /contacts/pending
const removeContactPending = async (req, res) => {
  try {
    const { contactId } = req.body;
    const userId = req.user?.id;

    await prisma.user.update({
      where: { id: contactId },
      data: {
        contacts: { disconnect: { id: parseInt(userId) } }
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
      error: error.message
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