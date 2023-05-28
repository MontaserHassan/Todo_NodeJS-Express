const isAdmin = (req, res, next) => {
    if ( req.user.isUser || req.user.isAdmin ) {
      next();
    } else {
      res.status(401).json({ message: 'You are not authorized to perform this action' });
    }
};

module.exports = {
    isAdmin
}