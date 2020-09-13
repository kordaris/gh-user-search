const { Octokit }       = require("@octokit/core");
const { createAppAuth } = require("@octokit/auth-token");

const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: process.env.GHTOKEN
});

const getUsers = async (q, page, per_page) => {
    try {

        if (!q) {
            return { total_count: 0, items: [] };
        }

        // This call returns the user search results
        const search_res = await octokit.request('GET /search/users', { 
            q,
            page,
            per_page
        });
        
        let users      = {};
        let user_items = [];
        let items      = search_res.data && search_res.data.items || [];

        if (search_res.status === 200) {
            if (items.length) {
                for (var i = 0; i < items.length; i++) {
                    try {
                        // For each user item a call is performed which returns the user data
                        let user = await octokit.request('GET /users/{username}', { 
                            username: items[i].login 
                        });
                        // Each user data is pushed to an array
                        if (user.status === 200 && user.data) {
                            user_items.push(user.data);                            
                        }
                        
                    } catch(e) {
                        console.error('error:', e);
                    }
                };
                
                // Set an object with necessary data which will be returned by the function
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
