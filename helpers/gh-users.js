const { Octokit }       = require("@octokit/core");
// const { createAppAuth } = require("@octokit/auth-app");

// const auth = createAppAuth({
//     id: 1,
//     privateKey: "-----BEGIN PRIVATE KEY-----\n...",
//     installationId: 1373100,
//     clientId: "1234567890abcdef1234",
//     clientSecret: "1234567890abcdef12341234567890abcdef1234",
//   });

const octokit = new Octokit();

// const octokit = new Octokit({
//     auth: '123'
// });

const getUsers = async (q) => {
    try {
        const search_res = await octokit.request('GET /search/users', { q });

        let users_searched = [];
        // let users          = [];
        users_searched = search_res.data;
    
        if (search_res.status === 200) {
            // users_searched = search_res.data.items;

            // if (users_searched.length) {
            //     users_searched.forEach(async item => {
            //         try {
            //             let user = await octokit.request('GET /users/{username}', { 
            //                 username: item.login 
            //             });
            //             // users.push(user);
            //         } catch(e) {
            //             console.error('error:', e);
            //         }
            //     });
            // }
        }
    
        return users_searched;

    } catch(e) {
        console.error('error:', e);
    }

}

module.exports = { getUsers };
