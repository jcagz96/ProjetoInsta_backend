const api = require('instagram-private-api');
const cookieParser = require('cookie-parser');


module.exports = {
    async store(req, res) {
        console.log(`[   LoginController.js]   |   /login `);

        var ig = new api.IgApiClient();

        const { username, password } = await req.body;

        ig.state.generateDevice(username);
        await ig.account.login(username, password);

        const cookies = await ig.state.serializeCookieJar();
        const state = {
            deviceString: ig.state.deviceString,
            deviceId: ig.state.deviceId,
            uuid: ig.state.uuid,
            phoneId: ig.state.phoneId,
            adid: ig.state.adid,
            build: ig.state.build,
        };
        const saved = {
            cookies: cookies,
            state: state
        }


        try {
            await ig.simulate.preLoginFlow();
            const auth = await ig.account.login(username, password);
            res.cookie('sessionCookies', JSON.stringify(saved));
            return res.json({ msg: "ok" })
        } catch (error) {
            console.log(`--------->${error}`);
            return res.json({ msg: error })
        }

    }
}