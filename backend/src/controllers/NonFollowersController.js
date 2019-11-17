const api = require('instagram-private-api');

var ig = new api.IgApiClient();

async function getAllItemsFromFeed(feed) {
    let items = [];

    var size = 0;
    do {

        console.log(`\n ___________________ \n`)

        let tmp = await feed.items();

        for (var i = 0; i < tmp.length; i++ , size++) {
            const res = await ig.friendship.show(tmp[i].pk);

            if (!res.followed_by) {
                console.log(`${tmp[i].username} -------> Segue-me ?  ${res.followed_by}`);
                items.push(tmp[i]);
            }
        }

    } while (feed.isMoreAvailable());
    return items;
}

module.exports = {
    async store(req, res) {

        console.log(`[NonFollowersController.js]   |   /nonFollowers `);


        const intermediario = JSON.parse(req.cookies.sessionCookies);

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

        console.log(auth.pk);

        const followings = await getAllItemsFromFeed(ig.feed.accountFollowing(auth.pk));



        return res.status(200).json({ msg: followings });

    }
}