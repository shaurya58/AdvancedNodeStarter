const { clearHash } = require("../services/cache");

module.exports = (fn) => async (req, res, next) => {
  const localRes = {
    ...res,
    send(...args) {
      res.send(...args);
      if ([200, 201].includes(res.statusCode)) {
        clearHash(req.user.id);
      }
    },
  };

  await fn(req, localRes, next);
};
