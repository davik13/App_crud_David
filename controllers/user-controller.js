const multer = require('multer')
const User = require('../models/user');

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "tout les champs sont requis" })
  }
  console.log(req.file)
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    mail: req.body.mail,
    phone: req.body.phone,
    img: req.file.path,
    role: req.body.role

  });

  user.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message || 'probleme creation user' });
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

exports.uploadImg = multer({ storage: storage }).single('image');

exports.findAll = (_req, res) => {

  User.find().then(users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send({ message: err.message || 'probleme avec la recuperation des users' });
  })
};

exports.findOne = (req, res) => {

  User.findById(req.params.id).then(user => {
    if (!user) {
      return res.status(400).send({ message: 'user pas trouvé' + req.params.id })
    }
    res.send(user);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({ message: 'user pas trouver' + req.params.id })
    }
    return res.status(500).send({ message: 'erreur recup user avec id ' + req.params.id })
  })

}

exports.update = (req, res) => {

  if (!req.body) {
    return res.status(400).send({ message: 'tout les champs sont requis' })
  }

  User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.first_name,
    lastName: req.body.lastName,
    userName: req.body.userName,
    mail: req.body.mail,
    phone: req.body.phone,
    photo: req.body.photo,
    role: req.body.role
  }, { new: true }).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'user pas trouvé' + req.params.id })
    }
    res.send(user);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({ message: 'user pas trouvé' + req.params.id })
    }
    return res.status(500).send({ message: 'erreur modif user avec id' + req.params.id })
  })

}

exports.delete = (req, res) => {

  User.findByIdAndRemove(req.params.id).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'user pas trouvé' + req.params.id })
    }
    res.send({ message: 'user delete parfaitement' })
  }).catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'pas trouvé') {
      return res.status(404).send({ message: 'user pas trouvé' + req.params.id })
    }
    return res.status(500).send({ message: 'impossible de delete user avec id' + req.params.id })
  })

}