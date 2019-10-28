const api = require('instagram-private-api');

module.exports = {
    async store(req, res) {
        const { session_cookies } = await req.headers;

        var ig = new api.IgApiClient();


        //console.log(`testingggg:> ${JSON.parse(decodeURIComponent(session_cookies))}`)

        const intermediario = JSON.parse(decodeURIComponent(session_cookies));

        console.log(`----> ${intermediario.cookies.cookies[0].value}`)
        //console.log(`----< ${JSON.stringify(intermediario.state)}`)



        await ig.state.deserializeCookieJar(intermediario.cookies);
        ig.state.deviceString = intermediario.state.deviceString;
        ig.state.deviceId = intermediario.state.deviceId;
        ig.state.uuid = intermediario.state.uuid;
        ig.state.phoneId = intermediario.state.phoneId;
        ig.state.adid = intermediario.state.adid;
        ig.state.build = intermediario.state.build;


        const auth = await ig.user.info(
            await ig.user.getIdByUsername(intermediario.cookies.cookies[0].value)
        )

        const response = {
            profile_pic_url: auth.hd_profile_pic_url_info.url,
            media_count: auth.media_count,
            follower_count: auth.follower_count,
            following_count: auth.following_count,
            full_name: auth.full_name,
            biography: auth.biography,
            verified: auth.is_verified,
        }

        return res.status(200).json(response);

    }
}