const { userService } = require('../services');

module.exports = {
    async postLogin(req, res) {
        const userSession = req.session
        const { name } = req.body;
        req.session.user = {
            name,
            isLoggedIn: true
        }

        try {
            await req.session.save();
        } catch (err) {
            console.error('Error saving to session storage: ', err);
            return next(new Error('Error creating user'));
        }

        res.status(200).json({
            estado: true,
            msg: 'OK',
            data: name
        });


    },
    async getCheckSession(ctx) {
        const userSession = ctx.session?.passport?.user;
      
        if (!userSession) {
          ctx.response.status = 202;
          ctx.response.body = {
            estado: true,
            msg: 'No existe (session)',
            data: {}
          };
        } else {
          ctx.response.status = 200;
          ctx.response.body = {
            estado: true,
            data: userSession
          };
        }
    },
    async getLogout(ctx) {
        await ctx.session.destroy();
        ctx.response.status = 200;
        ctx.response.body = {
          estado: true,
          data: {}
        };
      }


}