const jwt = require('jsonwebtoken');
const config = require('../../config');
const crypto = require('../utils/crypto');
const User = require('../models/user');

async function register(ctx) {
  let { username, password } = ctx.request.body;
  password = crypto.encryptPassword(password);
  try {
    let user = await User.create({
      username,
      password
    });
    if (user) {
      ctx.body = {
        code: 0,
        data: '注册成功'
      };
    } else {
      ctx.body = {
        code: 1,
        data: '注册失败'
      };
    }
  } catch (e) {
    console.error(e);
    ctx.body = {
      code: -1,
      data: e.name
    };
  }
}

async function login(ctx) {
  let { username, password } = ctx.request.body;
  password = crypto.encryptPassword(password);
  try {
    let user = await User.findOne({
      where: {
        username,
        password
      }
    });
    if (user) {
      let token = jwt.sign(
        {
          ...user
        },
        config.secret,
        {
          expiresIn: '24h'
        }
      );
      ctx.body = {
        code: 0,
        data: token
      };
    } else {
      ctx.body = {
        code: 1,
        data: '用户名或密码错误'
      };
    }
  } catch (e) {
    console.error(e);
    ctx.body = {
      code: -1,
      data: e.name
    };
  }
}

exports.register = register;
exports.login = login;
