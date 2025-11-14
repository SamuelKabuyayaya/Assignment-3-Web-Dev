import Contact from "../models/contact.model.js";

const contactById = async (req, res, next, id) => {
  try {
    let contact = await Contact.findById(id);
    if (!contact)
      return res.status(404).json({error: "Contact not found"});
    req.profile = contact;
    next();
   } catch (err){
    return res.status(400).json({error: "Could not find contact"});
   }
  };

  const list = async (req, res) => {
    let contacts = await Contact.find();
    res.json(contacts);
  }

  const create = async (req, res) => {
    try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({message: "Contact was created!"});
    }catch (err){
      res.status(400).json({error: err.message});
    }
  };

  const read = (req, res) => {
    res.json(req.profile);
  };

  const update = async (req, res) => {
    try {
      let contact = req.profile;
      contact.firstname = req.body.firstname || contact.firstname;
      contact.lastname = req.body.lastname || contact.lastname;
      contact.email = req.body.email || contact.email;
      contact.phone     = req.body.phone     || contact.phone;
      contact.topic     = req.body.topic     || contact.topic;
      contact.message   = req.body.message   || contact.message;

      await contact.save();
      res.json({message: "Contact updated!"});
    } catch (err){
            res.status(400).json({error: err.message});
    }
  };

  const remove = async (req, res) => {
    try {
      await Contact.findByIdAndDelete(req.profile._id);
      res.json({message: "Contact deleted!"});
    }catch (err){
           res.status(400).json({error: err.message});
    }
  };

   const removeAll = async (req, res) => {
        try {
          await Contact.deleteMany({});
          res.json({message: "All Contacts deleted!"});
        }catch (err){
               res.status(400).json({error: err.message});
        }
      };


  export default {list, create, read, update, remove, removeAll, contactById}