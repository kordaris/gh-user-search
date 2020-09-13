const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
    auth: '123' // PAT should not be public
});

const getUsers = async (q, page, per_page) => {
    try {
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
