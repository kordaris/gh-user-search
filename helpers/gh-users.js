const Octokit = require("@octokit/core").Octokit;
const { createAppAuth } = require("@octokit/auth-token");

// const octokit = new Octokit({
//     auth: process.env.GHTOKEN, // PAT should not be public
//     // auth: 'bb2a0c9f78e604e4650d82649a97dbc8f6b63098', // PAT should not be public
// });
const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: process.env.GHTOKEN
    // auth: "bb2a0c9f78e604e4650d82649a97dbc8f6b63098"
});


const getUsers = async (q, page, per_page) => {
    try {
        // const auth = await createAppAuth({ type: "oauth", code: process.env.GHTOKEN });

        const search_res = await octokit.request('GET /search/users', { 
            q,
            page,
            per_page
        });
        
        let users = {};
        let user_items = [];
        let items = search_res.data && search_res.data.items && search_res.data.items || [];
        if (search_res.status === 200) {
            if (items.length) {
                for (var i = 0; i < items.length; i++) {
                    try {
                        let user = await octokit.request('GET /users/{username}', { 
                            username: items[i].login 
                        });
                        
                        if (user.status === 200 && user.data) {
                            user_items.push(user.data);                            
                        }
                        
                    } catch(e) {
                        console.error('error:', e);
                    }
                };
                
                users = {
                    total_count: search_res.data.total_count,
                    items: user_items
                }

            }
        }

        return users;

    } catch(e) {
        console.error('error:', e);
    }

}

module.exports = { getUsers };
