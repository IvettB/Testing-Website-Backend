const express = require(`express`)
const router = express.Router()
const passport = require("passport")

/**
 * GET: Returns one task with the task's id specified in the path
 */
router.get(`/google`, passport.authenticate('google', { scope: [`https://www.googleapis.com/auth/userinfo.email`] }));

router.get('/google/callback', passport.authenticate('google'), async (req, res) => {
    // This tries to save the session, and if it fails it makes sure the passport session is deleted via req.logout()
    req.session.save(err => {
        if (err) {
            req.logout()
            res.sendStatus(500)
        }
        else res.redirect(process.env.CLIENT_ORIGIN)
    })
});

//Logout route
router.get(`/logout`, async (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy()
        res.redirect(process.env.CLIENT_ORIGIN)
    });
});

module.exports = router;